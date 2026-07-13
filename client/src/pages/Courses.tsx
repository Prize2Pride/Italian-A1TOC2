import React, { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/_core/hooks/useAuth';
import { Link } from 'wouter';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const Courses: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState('A1');

  // Fetch lessons for selected level
  const { data: lessons, isLoading } = trpc.lessons.list.useQuery(
    { level: selectedLevel },
    { enabled: true }
  );

  // Get user progress if authenticated
  const { data: userProgress } = trpc.lessons.getUserProgress.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const getProgressForLesson = (lessonId: number) => {
    return userProgress?.find((p: any) => p.lessonId === lessonId);
  };

  return (
    <div className="rtl min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="font-arabic-title text-4xl font-bold mb-2">دوراتنا</h1>
          <p className="font-arabic-body text-lg opacity-90">
            اختر مستواك وابدأ رحلتك في تعلم اللغة الإيطالية
          </p>
        </div>
      </section>

      {/* Courses Content */}
      <section className="container py-12">
        <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="w-full">
          {/* Level Tabs */}
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            {LEVELS.map((level) => (
              <TabsTrigger key={level} value={level} className="font-arabic-title font-bold">
                {level}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Lessons for Selected Level */}
          {LEVELS.map((level) => (
            <TabsContent key={level} value={level} className="space-y-6">
              {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-64 rounded-lg" />
                  ))}
                </div>
              ) : lessons && lessons.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {lessons.map((lesson: any) => {
                    const progress = getProgressForLesson(lesson.id);
                    const isCompleted = progress?.isCompleted;
                    const quizScore = progress?.quizScore;

                    return (
                      <Card
                        key={lesson.id}
                        className="hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
                          <h3 className="font-arabic-title text-xl font-bold">
                            {lesson.titleItalian}
                          </h3>
                          <p className="font-arabic-body text-sm text-muted-foreground">
                            {lesson.title}
                          </p>
                        </div>
                        <div className="p-6">
                          <p className="font-arabic-body text-sm text-muted-foreground mb-4 line-clamp-3">
                            {lesson.description}
                          </p>

                          {/* Progress Indicator */}
                          {isCompleted && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-sm font-arabic-body text-green-700">
                                ✓ مكتمل - النتيجة: {quizScore}%
                              </p>
                            </div>
                          )}

                          {/* Register Level Badge */}
                          {lesson.registerLevel && (
                            <div className="mb-4 inline-block">
                              <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                                {getRegisterLevelLabel(lesson.registerLevel)}
                              </span>
                            </div>
                          )}

                          <Link href={`/lesson/${lesson.id}`}>
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                              {isCompleted ? 'مراجعة' : 'ابدأ الدرس'}
                              <ArrowRight className="mr-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="font-arabic-body text-muted-foreground text-lg">
                    لا توجد دروس متاحة لهذا المستوى حالياً
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
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

export default Courses;
