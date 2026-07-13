import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserCircle2 } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="rtl">
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center text-primary-foreground"
        style={{
          backgroundImage: `url(/manus-storage/hero-main_d43df6b0.jpg)`,
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0% 100%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-primary/70 to-transparent"></div>
        <div className="container relative z-10 flex h-full flex-col items-end justify-center text-right">
          <h1 className="font-arabic-title text-5xl font-bold leading-tight">
            تعلّم الإيطالية بأسلوب ممتع ومبتكر
          </h1>
          <p className="mt-4 max-w-xl text-lg font-arabic-body">
            منصة إيتالينا تقدم لك دورات شاملة وممتعة لتعلم اللغة الإيطالية من الصفر وحتى الاحتراف، مصممة خصيصًا للمتحدثين باللغة العربية.
          </p>
          <Link href="/courses">
            <Button className="mt-8 bg-secondary text-secondary-foreground hover:bg-secondary/90">
              ابدأ رحلتك الآن <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Course Overview Section */}
      <section className="container -mt-20 relative z-20 py-12">
        <h2 className="font-arabic-title text-4xl font-bold text-foreground text-center mb-10">
          مستويات الدورة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for A1 Course Card */}
          <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 transform -skew-y-1 hover:skew-y-0 transition-transform duration-300">
            <h3 className="font-arabic-title text-2xl font-bold mb-2">المستوى A1</h3>
            <p className="font-arabic-body text-muted-foreground mb-4">
              ابدأ من الأساسيات: الأبجدية، التحيات، التعريف بالنفس، والعبارات اليومية.
            </p>
            <Link href="/courses">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                اكتشف دروس A1
              </Button>
            </Link>
          </div>

          {/* Placeholder for A2 Course Card */}
          <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 transform -skew-y-1 hover:skew-y-0 transition-transform duration-300">
            <h3 className="font-arabic-title text-2xl font-bold mb-2">المستوى A2</h3>
            <p className="font-arabic-body text-muted-foreground mb-4">
              طور مهاراتك: تحدث عن الماضي، المستقبل، والتعبير عن الرأي.
            </p>
            <Button variant="outline" disabled className="w-full">
              قريباً
            </Button>
          </div>

          {/* Placeholder for B1 Course Card */}
          <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 transform -skew-y-1 hover:skew-y-0 transition-transform duration-300">
            <h3 className="font-arabic-title text-2xl font-bold mb-2">المستوى B1</h3>
            <p className="font-arabic-body text-muted-foreground mb-4">
              تواصل بطلاقة: شارك في المحادثات المعقدة وافهم النصوص الأصيلة.
            </p>
            <Button variant="outline" disabled className="w-full">
              قريباً
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Section - Professor Chat */}
      <section className="bg-primary text-primary-foreground py-16 mt-12 clip-path-polygon-top-left-skew">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-right">
            <h2 className="font-arabic-title text-4xl font-bold leading-tight mb-4">
              أستاذك الإيطالي الخاص، 24/7
            </h2>
            <p className="font-arabic-body text-lg mb-6">
              مع ميزة الدردشة التفاعلية مع الأستاذ رؤوف الفاضل، احصل على شروحات مفصلة وإجابات لجميع استفساراتك حول اللغة الإيطالية، بأي مستوى من التفصيل، وفي أي وقت.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="/professor">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  تحدث مع الأستاذ 🎓
                </Button>
              </Link>
          <Link href="/unlimited">
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
              دردشة غير محدودة 🚀
            </Button>
          </Link>
          <Link href="/unlimited-courses">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              توليد دورات غير محدودة 📚
            </Button>
          </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-start">
            {/* Placeholder for Professor Chat image/icon */}
            <UserCircle2 className="h-32 w-32 text-primary-foreground" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground py-8 text-center rtl">
        <div className="container">
          <p>&copy; 2026 Italina. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
