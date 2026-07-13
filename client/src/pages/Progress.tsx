import React from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, TrendingUp, BookOpen, Award, Clock } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const ProgressDashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Fetch user progress
  const { data: userProgress, isLoading } = trpc.lessons.getUserProgress.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  if (!isAuthenticated) {
    return null;
  }

  const calculateStats = () => {
    if (!userProgress) return { total: 0, completed: 0, avgScore: 0, totalTime: 0 };

    const completed = userProgress.filter((p: any) => p.isCompleted).length;
    const avgScore =
      userProgress.length > 0
        ? Math.round(
            userProgress.reduce((sum: number, p: any) => sum + (p.quizScore || 0), 0) /
              userProgress.length
          )
        : 0;
    const totalTime = userProgress.reduce((sum: number, p: any) => sum + (p.timeSpent || 0), 0);

    return {
      total: userProgress.length,
      completed,
      avgScore,
      totalTime,
    };
  };

  const stats = calculateStats();
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="rtl min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8">
        <div className="container">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للرئيسية
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-8 w-8" />
            <h1 className="font-arabic-title text-4xl font-bold">تقدمك في التعلم</h1>
          </div>
          <p className="font-arabic-body text-lg opacity-90">
            تابع إنجازاتك وتقدمك في رحلة تعلم اللغة الإيطالية
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-arabic-title text-sm font-medium text-muted-foreground">
                الدروس المكتملة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? <Skeleton className="h-8 w-12" /> : stats.completed}
              </div>
              <p className="text-xs text-muted-foreground mt-1">من {stats.total} درس</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-arabic-title text-sm font-medium text-muted-foreground">
                متوسط النتيجة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? <Skeleton className="h-8 w-12" /> : `${stats.avgScore}%`}
              </div>
              <p className="text-xs text-muted-foreground mt-1">في الاختبارات</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-arabic-title text-sm font-medium text-muted-foreground">
                الوقت المستغرق
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? <Skeleton className="h-8 w-12" /> : `${Math.round(stats.totalTime / 60)}h`}
              </div>
              <p className="text-xs text-muted-foreground mt-1">ساعات التعلم</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-arabic-title text-sm font-medium text-muted-foreground">
                نسبة الإكمال
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? <Skeleton className="h-8 w-12" /> : `${completionPercentage}%`}
              </div>
              <p className="text-xs text-muted-foreground mt-1">من جميع الدروس</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress by Level */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="font-arabic-title">التقدم حسب المستوى</CardTitle>
            <CardDescription className="font-arabic-body">
              نسبة إكمال الدروس لكل مستوى
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-6">
                {LEVELS.map((level) => (
                  <Skeleton key={level} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {LEVELS.map((level) => {
                  const levelProgress = userProgress?.filter((p: any) => p.level === level) || [];
                  const levelCompleted = levelProgress.filter((p: any) => p.isCompleted).length;
                  const levelPercentage =
                    levelProgress.length > 0 ? Math.round((levelCompleted / levelProgress.length) * 100) : 0;

                  return (
                    <div key={level}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-arabic-title font-semibold text-foreground">{level}</span>
                        <span className="text-sm text-muted-foreground">
                          {levelCompleted} / {levelProgress.length}
                        </span>
                      </div>
                      <Progress value={levelPercentage} className="h-3" />
                      <p className="text-xs text-muted-foreground mt-1">{levelPercentage}% مكتمل</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-arabic-title">آخر الأنشطة</CardTitle>
            <CardDescription className="font-arabic-body">
              الدروس التي أكملتها مؤخراً
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : userProgress && userProgress.length > 0 ? (
              <div className="space-y-4">
                {userProgress
                  .filter((p: any) => p.isCompleted)
                  .slice(0, 5)
                  .map((progress: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-arabic-body font-semibold text-foreground">
                            {progress.lessonTitle || `الدرس ${progress.lessonId}`}
                          </p>
                          <p className="text-xs text-muted-foreground">المستوى: {progress.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{progress.quizScore}%</p>
                        <p className="text-xs text-muted-foreground">النتيجة</p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <p className="font-arabic-body text-muted-foreground">لم تكمل أي دروس بعد</p>
                <Button
                  className="mt-4 bg-green-600 text-white hover:bg-green-700"
                  onClick={() => navigate('/courses')}
                >
                  ابدأ الآن
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ProgressDashboard;
