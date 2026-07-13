import React, { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Volume2, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import { useParams } from 'wouter';

const LessonDetail: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const params = useParams() as { id?: string };
  const lessonId = parseInt(params?.id || '0');

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Fetch lesson details
  const { data: lesson, isLoading } = trpc.lessons.get.useQuery(
    { id: lessonId },
    { enabled: lessonId > 0 }
  );

  // Mark lesson complete mutation
  const completeLesson = trpc.lessons.updateProgress.useMutation();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      utterance.rate = 0.9;
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCompleteLesson = async () => {
    try {
      await completeLesson.mutateAsync({
        lessonId,
        isCompleted: true,
        quizScore: 100, // Default score - can be updated based on quiz results
      });
      setIsCompleted(true);
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="rtl min-h-screen bg-background p-6">
        <Skeleton className="h-12 w-32 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="rtl min-h-screen bg-background p-6">
        <Button variant="outline" onClick={() => navigate('/courses')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          العودة للدروس
        </Button>
        <div className="text-center mt-12">
          <p className="font-arabic-body text-muted-foreground">الدرس غير موجود</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rtl min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="container">
          <Button
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/20 mb-4"
            onClick={() => navigate('/courses')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للدروس
          </Button>
          <h1 className="font-arabic-title text-4xl font-bold mb-2">{lesson.title}</h1>
          <p className="font-arabic-body text-lg opacity-90">{lesson.titleItalian}</p>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="vocabulary">المفردات</TabsTrigger>
              <TabsTrigger value="grammar">القواعد</TabsTrigger>
              <TabsTrigger value="reading">القراءة</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-arabic-title">وصف الدرس</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-arabic-body text-foreground leading-relaxed mb-6">
                    {lesson.description}
                  </p>

                  {lesson.registerLevel && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="font-arabic-body text-sm">
                        <strong>مستوى اللغة:</strong> {getRegisterLevelLabel(lesson.registerLevel)}
                      </p>
                    </div>
                  )}

                  {isCompleted ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-arabic-body text-green-700">
                        تم إكمال هذا الدرس بنجاح!
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={handleCompleteLesson}
                      disabled={completeLesson.isPending}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {completeLesson.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          جاري الحفظ...
                        </>
                      ) : (
                        'إكمال الدرس'
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vocabulary Tab */}
            <TabsContent value="vocabulary" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-arabic-title">المفردات الأساسية</CardTitle>
                </CardHeader>
                <CardContent>
                  {lesson.vocabulary && Array.isArray(lesson.vocabulary) && lesson.vocabulary.length > 0 ? (
                    <div className="space-y-4">
                      {(lesson.vocabulary as any[]).map((word: any, idx: number) => (
                        <div key={idx} className="p-4 border border-border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-bold text-lg text-foreground">{word.italian}</p>
                              <p className="font-arabic-body text-muted-foreground">{word.arabic}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSpeak(word.italian)}
                              disabled={isSpeaking}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {word.example && (
                            <p className="font-arabic-body text-sm text-muted-foreground italic mt-2">
                              مثال: {word.example}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-arabic-body text-muted-foreground">لا توجد مفردات في هذا الدرس</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Grammar Tab */}
            <TabsContent value="grammar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-arabic-title">شرح القواعد</CardTitle>
                </CardHeader>
                <CardContent>
                  {lesson.grammar ? (
                    <div className="font-arabic-body text-foreground leading-relaxed whitespace-pre-wrap">
                      {lesson.grammar}
                    </div>
                  ) : (
                    <p className="font-arabic-body text-muted-foreground">لا توجد قواعس في هذا الدرس</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reading Tab */}
            <TabsContent value="reading" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-arabic-title">نص القراءة</CardTitle>
                </CardHeader>
                <CardContent>
                  {lesson.readingComprehension ? (
                    <div>
                      <div className="mb-6 p-4 bg-card border border-border rounded-lg">
                        <p className="font-arabic-body text-foreground leading-relaxed whitespace-pre-wrap">
                          {lesson.readingComprehension}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => lesson.readingComprehension && handleSpeak(lesson.readingComprehension)}
                          disabled={isSpeaking}
                          className="mt-4"
                        >
                          <Volume2 className="h-4 w-4 mr-2" />
                          اسمع النص
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="font-arabic-body text-muted-foreground">لا يوجد نص قراءة في هذا الدرس</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

function getRegisterLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    volgare: 'عامية',
    colloquiale: 'غير رسمية',
    neutro: 'محايدة',
    formale: 'رسمية',
    letterario: 'أدبية',
  };
  return labels[level] || level;
}

export default LessonDetail;
