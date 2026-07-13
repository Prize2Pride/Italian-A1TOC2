import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import * as db from "../db";
import { invokeLLM } from "../_core/llm";

const REGISTER_LEVELS = ["volgare", "colloquiale", "neutro", "formale", "letterario"];

export const professorRouter = router({
  // Send message to AI Professor (protected - unlimited free access)
  chat: protectedProcedure
    .input(
      z.object({
        message: z.string().min(1),
        registerLevel: z.enum(["volgare", "colloquiale", "neutro", "formale", "letterario"]).default("neutro"),
        topic: z.string().optional(),
        conversationContext: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { message, registerLevel, topic, conversationContext } = input;

      // Build system prompt based on register level
      const registerPrompt = getRegisterPrompt(registerLevel);
      
      const systemPrompt = `You are Professor Raouf, an expert Italian language teacher. You teach Italian to Arabic speakers with unlimited patience and depth.

${registerPrompt}

Respond in the selected Italian register level. Provide detailed explanations, examples, and cultural context. You have no usage limits - answer as thoroughly as needed.

${topic ? `Current topic: ${topic}` : ""}`;

      try {
        // Call LLM with conversation history
        const messages = conversationContext || [];
        messages.push({ role: "user", content: message });

        const response = await invokeLLM({
          model: "claude-opus",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            ...messages.map(m => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            })),
          ],
          maxTokens: 2000,
        });

        const messageContent = response.choices?.[0]?.message?.content;
        let assistantMessage = "";
        
        if (typeof messageContent === "string") {
          assistantMessage = messageContent;
        } else if (Array.isArray(messageContent) && messageContent.length > 0) {
          const textContent = messageContent.find((c: any) => c.type === "text") as any;
          assistantMessage = textContent?.text || "";
        }

        // Save to chat history (only if we got a valid response)
        if (assistantMessage) {
          await db.saveChatMessage(
            ctx.user.id,
            message,
            assistantMessage,
            registerLevel,
            topic
          );
        }

        return {
          message: assistantMessage || "Unable to generate response",
          registerLevel,
          topic,
        };
      } catch (error) {
        console.error("LLM error:", error);
        const errorMessage = `Mi scusi, ho avuto un problema tecnico. Per favore, riprova tra un momento.`;
        // Don't throw - return a graceful error response
        return {
          message: errorMessage,
          registerLevel,
          topic,
          error: true,
        };
      }
    }),

  // Get chat history (protected)
  getHistory: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }).optional())
    .query(async ({ input, ctx }) => {
      return db.getChatHistory(ctx.user.id, input?.limit);
    }),

  // Get register level definitions (public)
  getRegisterLevels: publicProcedure.query(() => {
    return [
      {
        level: "volgare",
        name: "عامية الشارع",
        description: "Street slang and very informal speech",
        example: "Dai, vieni qua! Che cosa stai facendo?",
      },
      {
        level: "colloquiale",
        name: "غير رسمية",
        description: "Casual, friendly speech with friends and family",
        example: "Ciao, come stai? Cosa hai fatto oggi?",
      },
      {
        level: "neutro",
        name: "محايدة",
        description: "Standard, neutral Italian used in media and education",
        example: "Buongiorno, come sta? Cosa ha fatto oggi?",
      },
      {
        level: "formale",
        name: "رسمية",
        description: "Formal, professional speech for business and official contexts",
        example: "Buongiorno Signor Rossi, come sta? Potrei chiederle un favore?",
      },
      {
        level: "letterario",
        name: "أدبية",
        description: "Literary, poetic language used in literature and formal writing",
        example: "Quale mai potrebbe essere il motivo di sì grave turbamento?",
      },
    ];
  }),
});

function getRegisterPrompt(level: string): string {
  const prompts: Record<string, string> = {
    volgare: `Respond in street slang (volgare) - very informal, using colloquial expressions, contractions, and everyday language. Use words like "dai", "vabbè", "cazzo", etc. Be friendly and casual.`,
    
    colloquiale: `Respond in casual, informal Italian (colloquiale) - as you would speak with friends. Use "tu" form, contractions, and natural discourse markers like "allora", "insomma", "magari".`,
    
    neutro: `Respond in standard, neutral Italian (neutro) - the language of media, news, and education. Use proper grammar, "Lei" form for formal contexts, clear and accessible language.`,
    
    formale: `Respond in formal, professional Italian (formale) - suitable for business, official correspondence, and formal situations. Use "Lei" form, complete sentences, subjunctive mood where appropriate, and formal vocabulary.`,
    
    letterario: `Respond in literary, poetic Italian (letterario) - using elevated language, archaic forms where appropriate, complex sentence structures, and refined vocabulary. Use inverted word order and subjunctive moods.`,
  };

  return prompts[level] || prompts.neutro;
}
