import React, { useState, useRef, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Send, Copy, Download, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const REGISTERS = [
  { id: 'sporchissimo', label: 'Sporchissimo (Dirtiest)' },
  { id: 'sporco', label: 'Sporco (Dirty)' },
  { id: 'informale', label: 'Informale (Informal)' },
  { id: 'neutro', label: 'Neutro (Neutral)' },
  { id: 'formale', label: 'Formale (Formal)' },
  { id: 'diplomatico', label: 'Diplomatico (Diplomatic)' },
  { id: 'diplomatico_elevato', label: 'Diplomatico Elevato (High-End Diplomatic)' },
];

interface GeneratedLesson {
  title: string;
  titleItalian: string;
  level: string;
  register: string;
  vocabulary: Array<{ italian: string; arabic: string; example: string }>;
  grammar: string;
  readingComprehension: string;
  readingComprehensionTranslation: string;
  quizQuestions: Array<{ question: string; options: string[]; correct: number }>;
  culturalContext: string;
  registerNotes: string;
}

const LessonGenerator: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('A1');
  const [register, setRegister] = useState('neutro');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState<GeneratedLesson | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [userMessage, setUserMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const generateLessonMutation = trpc.generation.generateLesson.useMutation();
  const saveLessonMutation = trpc.generation.saveLesson.useMutation();

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleGenerateLesson = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await generateLessonMutation.mutateAsync({
        topic,
        level: level as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2',
        register: register as any,
      });

      setGeneratedLesson({
        title: response.title || '',
        titleItalian: response.titleItalian || '',
        level: response.level || level,
        register: response.register || register,
        vocabulary: response.vocabulary || [],
        grammar: response.grammar || '',
        readingComprehension: response.readingComprehension || '',
        readingComprehensionTranslation: response.readingComprehensionTranslation || '',
        quizQuestions: response.quizQuestions || [],
        culturalContext: response.culturalContext || '',
        registerNotes: response.registerNotes || '',
      });
      setChatHistory([
        ...chatHistory,
        {
          role: 'user' as const,
          content: `Generate an Italian lesson about "${topic}" at level ${level} in ${register} register`,
        },
        {
          role: 'assistant' as const,
          content: `I've generated a comprehensive Italian lesson about "${topic}" at the ${level} level in ${register} register. The lesson includes vocabulary, grammar explanations, reading comprehension, and interactive quiz questions.`,
        },
      ]);
      toast.success('Lesson generated successfully!');
      setTopic('');
    } catch (error) {
      console.error('Error generating lesson:', error);
      toast.error('Failed to generate lesson: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveLesson = async () => {
    if (!generatedLesson) return;

    try {
      await saveLessonMutation.mutateAsync({
        title: generatedLesson.title,
        titleItalian: generatedLesson.titleItalian,
        level: generatedLesson.level as any,
        registerLevel: generatedLesson.register as any,
        description: generatedLesson.culturalContext,
        vocabulary: generatedLesson.vocabulary,
        grammar: generatedLesson.grammar,
        readingComprehension: generatedLesson.readingComprehension,
        readingComprehensionTranslation: generatedLesson.readingComprehensionTranslation,
        quizQuestions: generatedLesson.quizQuestions,
        isPublished: true,
      });
      toast.success('Lesson saved to database!');
    } catch (error) {
      console.error('Error saving lesson:', error);
      toast.error('Failed to save lesson: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setIsSending(true);
    const newHistory = [
      ...chatHistory,
      { role: 'user' as const, content: userMessage },
    ];
    setChatHistory(newHistory);
    setUserMessage('');

    try {
      const response = await trpc.professor.chat.useMutation().mutateAsync({
        message: userMessage,
        registerLevel: register as any,
        conversationContext: newHistory as any,
      });

      setChatHistory([
        ...(newHistory as Array<{ role: 'user' | 'assistant'; content: string }>),
        { role: 'assistant' as const, content: response.message || '' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyLesson = () => {
    if (!generatedLesson) return;

    const lessonText = `
TITLE: ${generatedLesson.title}
ITALIAN TITLE: ${generatedLesson.titleItalian}
LEVEL: ${generatedLesson.level}
REGISTER: ${generatedLesson.register}

VOCABULARY:
${generatedLesson.vocabulary.map((v) => `- ${v.italian} (${v.arabic}): ${v.example}`).join('\n')}

GRAMMAR:
${generatedLesson.grammar}

READING COMPREHENSION:
${generatedLesson.readingComprehension}

TRANSLATION:
${generatedLesson.readingComprehensionTranslation}

QUIZ QUESTIONS:
${generatedLesson.quizQuestions.map((q, i) => `${i + 1}. ${q.question}\n   ${q.options.map((o, j) => `${j + 1}. ${o}`).join('\n   ')}\n   Correct: ${q.correct + 1}`).join('\n\n')}

CULTURAL CONTEXT:
${generatedLesson.culturalContext}

REGISTER NOTES:
${generatedLesson.registerNotes}
    `.trim();

      if (navigator.clipboard) {
        navigator.clipboard.writeText(lessonText);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = lessonText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    toast.success('Lesson copied to clipboard!');
  };

  const handleDownloadLesson = () => {
    if (!generatedLesson) return;

    const lessonText = `
TITLE: ${generatedLesson.title}
ITALIAN TITLE: ${generatedLesson.titleItalian}
LEVEL: ${generatedLesson.level}
REGISTER: ${generatedLesson.register}

VOCABULARY:
${generatedLesson.vocabulary.map((v) => `- ${v.italian} (${v.arabic}): ${v.example}`).join('\n')}

GRAMMAR:
${generatedLesson.grammar}

READING COMPREHENSION:
${generatedLesson.readingComprehension}

TRANSLATION:
${generatedLesson.readingComprehensionTranslation}

QUIZ QUESTIONS:
${generatedLesson.quizQuestions.map((q, i) => `${i + 1}. ${q.question}\n   ${q.options.map((o, j) => `${j + 1}. ${o}`).join('\n   ')}\n   Correct: ${q.correct + 1}`).join('\n\n')}

CULTURAL CONTEXT:
${generatedLesson.culturalContext}

REGISTER NOTES:
${generatedLesson.registerNotes}
    `.trim();

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(lessonText));
    element.setAttribute('download', `lesson_${generatedLesson.titleItalian.replace(/\s+/g, '_')}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Lesson downloaded!');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="rtl min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-8">
        <div className="container">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للرئيسية
          </Button>
          <h1 className="font-arabic-title text-4xl font-bold mb-2">مولد الدروس الذكي</h1>
          <p className="font-arabic-body text-lg opacity-90">
            أنشئ دروساً إيطالية مخصصة بأي موضوع ومستوى وسجل لغوي
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Generator Controls */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="font-arabic-title">إعدادات الدرس</CardTitle>
                <CardDescription className="font-arabic-body">
                  حدد الموضوع والمستوى والسجل اللغوي
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Topic Input */}
                <div>
                  <label className="font-arabic-body text-sm font-semibold mb-2 block">
                    الموضوع
                  </label>
                  <Input
                    placeholder="مثال: الطعام الإيطالي"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="font-arabic-body"
                  />
                </div>

                {/* Level Select */}
                <div>
                  <label className="font-arabic-body text-sm font-semibold mb-2 block">
                    المستوى
                  </label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="font-arabic-body">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Register Select */}
                <div>
                  <label className="font-arabic-body text-sm font-semibold mb-2 block">
                    السجل اللغوي
                  </label>
                  <Select value={register} onValueChange={setRegister}>
                    <SelectTrigger className="font-arabic-body">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {REGISTERS.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerateLesson}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري الإنشاء...
                    </>
                  ) : (
                    'إنشاء درس'
                  )}
                </Button>

                {/* Save Button */}
                {generatedLesson && (
                  <Button
                    onClick={handleSaveLesson}
                    disabled={saveLessonMutation.isPending}
                    className="w-full bg-green-600 text-white hover:bg-green-700"
                  >
                    {saveLessonMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        حفظ الدرس
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Generated Lesson + Chat */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generated Lesson Display */}
            {generatedLesson && (
              <Card>
                <CardHeader className="bg-indigo-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="font-arabic-title text-2xl mb-2">
                        {generatedLesson.title}
                      </CardTitle>
                      <CardDescription className="font-arabic-body text-base">
                        {generatedLesson.titleItalian}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyLesson}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleDownloadLesson}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Vocabulary */}
                  <div>
                    <h3 className="font-arabic-title font-bold text-lg mb-3">المفردات</h3>
                    <div className="space-y-2">
                      {generatedLesson.vocabulary.slice(0, 5).map((v, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded">
                          <p className="font-bold text-foreground">{v.italian}</p>
                          <p className="text-sm text-muted-foreground">{v.arabic}</p>
                          <p className="text-sm italic text-foreground mt-1">{v.example}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grammar */}
                  <div>
                    <h3 className="font-arabic-title font-bold text-lg mb-3">القواعد</h3>
                    <p className="font-arabic-body text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {generatedLesson.grammar.substring(0, 300)}...
                    </p>
                  </div>

                  {/* Reading Comprehension */}
                  <div>
                    <h3 className="font-arabic-title font-bold text-lg mb-3">نص القراءة</h3>
                    <p className="font-arabic-body text-sm text-foreground leading-relaxed italic mb-3">
                      {generatedLesson.readingComprehension.substring(0, 200)}...
                    </p>
                    <p className="font-arabic-body text-sm text-muted-foreground">
                      {generatedLesson.readingComprehensionTranslation.substring(0, 200)}...
                    </p>
                  </div>

                  {/* Cultural Context */}
                  <div>
                    <h3 className="font-arabic-title font-bold text-lg mb-3">السياق الثقافي</h3>
                    <p className="font-arabic-body text-sm text-foreground leading-relaxed">
                      {generatedLesson.culturalContext}
                    </p>
                  </div>

                  {/* Register Notes */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <h3 className="font-arabic-title font-bold mb-2">ملاحظات السجل اللغوي</h3>
                    <p className="font-arabic-body text-sm text-foreground">
                      {generatedLesson.registerNotes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Chat Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="font-arabic-title">محادثة مع الأستاذ</CardTitle>
                <CardDescription className="font-arabic-body">
                  اطرح أسئلة حول الدرس أو اطلب تحسينات
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Chat History */}
                <div className="h-64 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
                  {chatHistory.length === 0 ? (
                    <p className="font-arabic-body text-muted-foreground text-center">
                      ابدأ محادثة جديدة
                    </p>
                  ) : (
                    chatHistory.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-blue-100 text-blue-900 mr-auto w-3/4'
                            : 'bg-gray-200 text-gray-900 ml-auto w-3/4'
                        }`}
                      >
                        <p className="font-arabic-body text-sm">{msg.content}</p>
                      </div>
                    ))
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="اكتب سؤالك هنا..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    className="font-arabic-body resize-none"
                    rows={2}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isSending || !userMessage.trim()}
                    className="bg-indigo-600 text-white hover:bg-indigo-700 h-full"
                  >
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LessonGenerator;
