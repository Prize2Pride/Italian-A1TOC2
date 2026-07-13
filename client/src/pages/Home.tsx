import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, MessageSquare, Sparkles, Globe, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { startLogin } from "@/const";

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="border-b border-border/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">🇮🇹</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Italina</h1>
              <p className="text-xs text-muted-foreground">Civilization Restored</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/courses")}>
                  الدروس
                </Button>
                <Button variant="ghost" onClick={() => navigate("/professor")}>
                  الأستاذ
                </Button>
                <Button variant="ghost" onClick={() => navigate("/progress")}>
                  التقدم
                </Button>
                <Button variant="outline" size="sm">
                  {user?.name || "المستخدم"}
                </Button>
              </>
            ) : (
              <Button onClick={() => startLogin()} className="bg-primary hover:bg-primary/90">
                ابدأ الآن
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-primary font-medium">تعلم اللغة الإيطالية بحرية كاملة</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              تعلّم الإيطالية
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary mt-2">
                من الأساسيات إلى الإتقان
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              منصة شاملة لتعلم اللغة الإيطالية من المستوى A1 إلى C2 مع أستاذ ذكي يعمل 24/7، 
              وآلاف الدروس المنسقة، وأدوات تفاعلية متقدمة. كل شيء مجاني وبلا قيود.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => isAuthenticated ? navigate("/courses") : startLogin()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8"
              >
                ابدأ التعلم
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/professor")}
                className="h-12 px-8 font-semibold"
              >
                تحدث مع الأستاذ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-border/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">المميزات الرئيسية</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              كل ما تحتاجه لإتقان اللغة الإيطالية في منصة واحدة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>2,401 درس مُنسّق</CardTitle>
                <CardDescription>من A1 إلى C2 مع 7 مستويات لغوية مختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  كل درس يحتوي على مفردات وقواعد نحوية وفهم القراءة واختبارات تفاعلية
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-card/50 border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>أستاذ ذكي 24/7</CardTitle>
                <CardDescription>محادثات غير محدودة مع AI متقدم</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  اطرح أسئلة، اطلب شرح القواعد، تدرب على المحادثة - بلا قيود
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>مولد الدروس الذكي</CardTitle>
                <CardDescription>أنشئ دروساً مخصصة حسب احتياجاتك</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  اختر الموضوع والمستوى والسجل اللغوي، وسيتم إنشاء درس كامل فوراً
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-card/50 border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>7 مستويات لغوية</CardTitle>
                <CardDescription>من الدارج إلى الدبلوماسي الرسمي</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  تعلم كيفية التحدث في كل سياق: الشارع، الحياة اليومية، العمل، الدبلوماسية
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>تتبع التقدم</CardTitle>
                <CardDescription>لوحة تحكم شاملة لمسارك التعليمي</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  تابع درجاتك، الدروس المكتملة، الوقت المستغرق، والمستويات المحققة
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="bg-card/50 border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>نطق وثقافة</CardTitle>
                <CardDescription>تعلم النطق الصحيح والثقافة الإيطالية</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  استمع للنطق الأصلي، اكتشف الثقافة الإيطالية والأدب والفن
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Levels Overview */}
      <section className="py-20 border-t border-border/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">مستويات التعلم</h2>
            <p className="text-muted-foreground text-lg">
              منهج شامل يغطي جميع مستويات الإطار الأوروبي المرجعي الموحد
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { level: "A1-A2", title: "المبتدئ", desc: "الأساسيات والحياة اليومية", lessons: "749" },
              { level: "B1-B2", title: "المتوسط", desc: "الحوارات المعقدة والثقافة", lessons: "756" },
              { level: "C1-C2", title: "المتقدم", desc: "الإتقان والدقة اللغوية", lessons: "896" },
            ].map((item) => (
              <Card key={item.level} className="bg-gradient-to-br from-card to-card/50 border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl">{item.level}</CardTitle>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary">
                      {item.lessons} درس
                    </span>
                  </div>
                  <CardDescription className="text-base font-semibold text-foreground">
                    {item.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{item.desc}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/courses")}
                  >
                    استكشف الدروس
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/50 bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">هل أنت مستعد لبدء رحلتك؟</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المتعلمين الذين يستكشفون جمال اللغة الإيطالية والثقافة الإيطالية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => isAuthenticated ? navigate("/courses") : startLogin()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8"
            >
              ابدأ التعلم المجاني
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/generator")}
              className="h-12 px-8 font-semibold"
            >
              جرب مولد الدروس
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Italina</h3>
              <p className="text-sm text-muted-foreground">
                منصة تعليم اللغة الإيطالية الشاملة والمجانية
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">المنصة</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">الدروس</a></li>
                <li><a href="#" className="hover:text-foreground transition">الأستاذ الذكي</a></li>
                <li><a href="#" className="hover:text-foreground transition">مولد الدروس</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">الموارد</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">الثقافة</a></li>
                <li><a href="#" className="hover:text-foreground transition">الأدب</a></li>
                <li><a href="#" className="hover:text-foreground transition">المساعدة</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">حول</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">عن المشروع</a></li>
                <li><a href="#" className="hover:text-foreground transition">الخصوصية</a></li>
                <li><a href="#" className="hover:text-foreground transition">الشروط</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Italina - تعليم اللغة الإيطالية مجاناً للجميع</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
