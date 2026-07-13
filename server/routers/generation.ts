import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '../_core/trpc';
import { invokeLLM, type InvokeResult } from '../_core/llm';
import * as db from '../db';

const REGISTER_DESCRIPTIONS = {
  sporchissimo: 'Dirtiest/most vulgar Italian - street slang, very informal, contains mild profanity',
  sporco: 'Dirty/crude Italian - informal, colloquial, sometimes crude',
  informale: 'Informal Italian - casual, friendly, everyday speech',
  neutro: 'Neutral Italian - standard, appropriate for most contexts',
  formale: 'Formal Italian - professional, respectful, business-like',
  diplomatico: 'Diplomatic Italian - very formal, careful word choice, international relations',
  diplomatico_elevato: 'High-end diplomatic Italian - extremely formal, refined, ceremonial',
};

// Database helper for creating lessons
async function createLessonInDb(data: any) {
  // This will be implemented in db.ts
  return { id: Math.random(), ...data };
}

export const generationRouter = router({
  // Generate a lesson using LLM
  generateLesson: publicProcedure
    .input(
      z.object({
        topic: z.string(),
        level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
        register: z.enum([
          'sporchissimo',
          'sporco',
          'informale',
          'neutro',
          'formale',
          'diplomatico',
          'diplomatico_elevato',
        ]),
      })
    )
    .mutation(async ({ input }) => {
      const { topic, level, register } = input;

      const prompt = `You are an expert Italian language teacher. Generate a complete, well-formatted Italian lesson with the following specifications:

TOPIC: ${topic}
CEFR LEVEL: ${level}
REGISTER: ${register} - ${REGISTER_DESCRIPTIONS[register as keyof typeof REGISTER_DESCRIPTIONS]}

Create a lesson that includes:

1. TITLE (in Arabic): A descriptive title for this lesson
2. TITLE_ITALIAN: The same title in Italian
3. VOCABULARY: 10 words/phrases with Italian, Arabic translation, and example sentences in the specified register
4. GRAMMAR: A detailed explanation of 2-3 grammar concepts relevant to this level and topic
5. READING_COMPREHENSION: A 150-200 word Italian text about the topic in the specified register
6. READING_TRANSLATION: Arabic translation of the reading comprehension
7. QUIZ_QUESTIONS: 5 multiple-choice questions about the lesson content
8. CULTURAL_CONTEXT: Information about Italian culture related to this topic
9. REGISTER_NOTES: Explanation of how this register differs from others and when to use it

Format your response as JSON with the following structure:
{
  "title": "Arabic title",
  "titleItalian": "Italian title",
  "vocabulary": [
    {"italian": "word", "arabic": "translation", "example": "example sentence in the register"}
  ],
  "grammar": "Detailed grammar explanation",
  "readingComprehension": "Italian text",
  "readingComprehensionTranslation": "Arabic translation",
  "quizQuestions": [
    {"question": "Question in Arabic", "options": ["option1", "option2", "option3", "option4"], "correct": 0}
  ],
  "culturalContext": "Cultural information",
  "registerNotes": "Notes about the register"
}

IMPORTANT: 
- Make the vocabulary and grammar appropriate for ${level} level
- Use the ${register} register consistently throughout
- Ensure all Arabic text is properly formatted
- Make quiz questions test understanding of the lesson content
- Provide exactly 4 options for each quiz question
- Ensure the lesson is educational and engaging`;

      try {
        const response = await invokeLLM({
          model: 'gpt-4-turbo',
          messages: [{ role: 'user', content: prompt }],
          maxTokens: 2000,
        });

        // Extract content from response
        let jsonContent = '';
        if (response.choices && response.choices.length > 0) {
          const choice = response.choices[0];
          if (choice.message && choice.message.content) {
            jsonContent = typeof choice.message.content === 'string' 
              ? choice.message.content 
              : JSON.stringify(choice.message.content);
          }
        }

        // Parse JSON
        const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('Could not extract JSON from response');
        }

        const lessonData = JSON.parse(jsonMatch[0]);

        return {
          title: lessonData.title,
          titleItalian: lessonData.titleItalian,
          level,
          register,
          vocabulary: lessonData.vocabulary || [],
          grammar: lessonData.grammar || '',
          readingComprehension: lessonData.readingComprehension || '',
          readingComprehensionTranslation: lessonData.readingComprehensionTranslation || '',
          quizQuestions: lessonData.quizQuestions || [],
          culturalContext: lessonData.culturalContext || '',
          registerNotes: lessonData.registerNotes || '',
        };
      } catch (error) {
        console.error('Error generating lesson:', error);
        throw new Error('Failed to generate lesson');
      }
    }),

  // Create a new lesson (alias for saveLesson)
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        titleItalian: z.string(),
        level: z.string(),
        registerLevel: z.string(),
        description: z.string(),
        vocabulary: z.array(z.any()),
        grammar: z.string(),
        readingComprehension: z.string(),
        readingComprehensionTranslation: z.string(),
        quizQuestions: z.array(z.any()),
        isPublished: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      return createLessonInDb(input);
    }),

  // Save a generated lesson to the database
  saveLesson: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        titleItalian: z.string(),
        level: z.string(),
        registerLevel: z.string(),
        description: z.string(),
        vocabulary: z.array(z.any()),
        grammar: z.string(),
        readingComprehension: z.string(),
        readingComprehensionTranslation: z.string(),
        quizQuestions: z.array(z.any()),
        isPublished: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      return createLessonInDb({
        title: input.title,
        titleItalian: input.titleItalian,
        level: input.level,
        registerLevel: input.registerLevel,
        description: input.description,
        vocabulary: input.vocabulary,
        grammar: input.grammar,
        readingComprehension: input.readingComprehension,
        readingComprehensionTranslation: input.readingComprehensionTranslation,
        quizQuestions: input.quizQuestions,
        isPublished: input.isPublished,
      });
    }),

  // Generate multiple lessons in bulk
  generateBulkLessons: publicProcedure
    .input(
      z.object({
        count: z.number().min(1).max(100),
        level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
        topics: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const { count, level, topics } = input;
      const lessons = [];

      for (let i = 0; i < count; i++) {
        const topic = topics[i % topics.length];
        const registers = [
          'sporchissimo',
          'sporco',
          'informale',
          'neutro',
          'formale',
          'diplomatico',
          'diplomatico_elevato',
        ];
        const register = registers[Math.floor(Math.random() * registers.length)];

        try {
          const lesson = await invokeLLM({
            model: 'gpt-4-turbo',
            messages: [
              {
                role: 'user',
                content: `Generate a quick Italian lesson outline for topic "${topic}" at level ${level} in ${register} register. Return as JSON with: title, titleItalian, vocabulary (5 items), grammar (1 paragraph), readingComprehension (100 words), quizQuestions (3 questions).`,
              },
            ],
            maxTokens: 1000,
          });

          lessons.push({
            topic,
            level,
            register,
            generated: true,
          });
        } catch (error) {
          console.error(`Error generating lesson for topic ${topic}:`, error);
        }
      }

      return {
        generated: lessons.length,
        total: count,
        lessons: lessons.slice(0, Math.min(10, lessons.length)),
      };
    }),
});
