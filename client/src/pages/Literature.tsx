import React, { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BookOpen, Feather } from 'lucide-react';
import { useLocation } from 'wouter';

const PERIODS = ['Medieval', 'Renaissance', 'Baroque', 'Enlightenment', 'Romantic', 'Modern'];

const Literature: React.FC = () => {
  const [, navigate] = useLocation();
  const [selectedPeriod, setSelectedPeriod] = useState('Medieval');

  // Fetch literature by period (using level as proxy for period)
  const { data: entries, isLoading } = trpc.literature.getByLevel.useQuery(
    { level: selectedPeriod },
    { enabled: true }
  );

  return (
    <div className="rtl min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-8">
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
            <Feather className="h-8 w-8" />
            <h1 className="font-arabic-title text-4xl font-bold">الأدب الإيطالي عبر التاريخ</h1>
          </div>
          <p className="font-arabic-body text-lg opacity-90">
            من دانتي إلى الأدب الحديث - رحلة عبر روائع الأدب الإيطالي
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
          {/* Period Tabs */}
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            {PERIODS.map((period) => (
              <TabsTrigger key={period} value={period} className="font-arabic-body">
                {period}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Period Content */}
          {PERIODS.map((period) => (
            <TabsContent key={period} value={period} className="space-y-6">
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-48 rounded-lg" />
                  ))}
                </div>
              ) : entries && entries.length > 0 ? (
                <div className="space-y-6">
                  {entries.map((entry: any, idx: number) => (
                    <Card key={entry.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="font-arabic-title text-2xl mb-2">
                              {entry.author}
                            </CardTitle>
                            <CardDescription className="font-arabic-body text-base">
                              {entry.period || `الفترة ${idx + 1}`}
                            </CardDescription>
                          </div>
                          <div className="text-4xl ml-4">📖</div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-arabic-title font-bold text-foreground mb-2">
                              {entry.title}
                            </h4>
                            <p className="font-arabic-body text-sm text-muted-foreground italic">
                              {entry.titleItalian}
                            </p>
                          </div>

                          <p className="font-arabic-body text-sm text-foreground leading-relaxed">
                            {entry.description}
                          </p>

                          {/* CEFR Level Badge */}
                          {entry.cefrLevel && (
                            <div className="inline-block">
                              <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                                المستوى: {entry.cefrLevel}
                              </span>
                            </div>
                          )}

                          {/* Excerpt */}
                          {entry.excerpt && (
                            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded">
                              <p className="font-arabic-body text-sm italic text-foreground">
                                "{entry.excerpt}"
                              </p>
                            </div>
                          )}

                          <Button className="w-full bg-amber-700 text-white hover:bg-amber-800">
                            <BookOpen className="mr-2 h-4 w-4" />
                            اقرأ النص الكامل
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="font-arabic-body text-muted-foreground text-lg">
                    لا توجد أعمال أدبية في هذه الفترة حالياً
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

export default Literature;
