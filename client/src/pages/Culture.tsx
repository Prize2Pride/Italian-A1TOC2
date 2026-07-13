import React, { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Palette, Music, UtensilsCrossed, BookOpen, MapPin } from 'lucide-react';
import { useLocation } from 'wouter';

const CATEGORIES = [
  { id: 'art', label: 'الفن', icon: Palette },
  { id: 'music', label: 'الموسيقى', icon: Music },
  { id: 'cuisine', label: 'الطعام', icon: UtensilsCrossed },
  { id: 'history', label: 'التاريخ', icon: BookOpen },
  { id: 'dialects', label: 'اللهجات', icon: MapPin },
];

const Culture: React.FC = () => {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('art');

  // Fetch culture modules by category
  const { data: modules, isLoading } = trpc.culture.getByCategory.useQuery(
    { category: selectedCategory },
    { enabled: true }
  );

  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategory);
  const IconComponent = currentCategory?.icon || Palette;

  return (
    <div className="rtl min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-8">
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
            <IconComponent className="h-8 w-8" />
            <h1 className="font-arabic-title text-4xl font-bold">الثقافة الإيطالية</h1>
          </div>
          <p className="font-arabic-body text-lg opacity-90">
            اكتشف الفن والموسيقى والطعام والتاريخ والثقافة الإيطالية
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          {/* Category Tabs */}
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-8">
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="font-arabic-body">
                <cat.icon className="h-4 w-4 mr-2" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Category Content */}
          {CATEGORIES.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="space-y-6">
              {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-64 rounded-lg" />
                  ))}
                </div>
              ) : modules && modules.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {modules.map((module: any) => (
                    <Card key={module.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-50">
                        <CardTitle className="font-arabic-title text-xl">{module.title}</CardTitle>
                        <CardDescription className="font-arabic-body">
                          {module.subtitle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="font-arabic-body text-sm text-muted-foreground mb-4 line-clamp-3">
                          {module.description}
                        </p>

                        {/* Level Badge */}
                        {module.level && (
                          <div className="mb-4 inline-block">
                            <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                              المستوى: {module.level}
                            </span>
                          </div>
                        )}

                        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                          اقرأ المزيد
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <IconComponent className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="font-arabic-body text-muted-foreground text-lg">
                    لا توجد محتويات في هذه الفئة حالياً
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

export default Culture;
