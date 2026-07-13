import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Home, ArrowRight, Volume2 } from 'lucide-react';

const NotFound: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const playSound = () => {
    // Play a fun Italian sound effect
    const utterance = new SpeechSynthesisUtterance('Scusa! Pagina non trovata!');
    utterance.lang = 'it-IT';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center p-4 rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-bounce" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Number with Animation */}
        <div
          className={`mb-8 transition-all duration-1000 transform ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <div className="text-9xl font-bold text-white drop-shadow-lg mb-4">
            404
          </div>
          <div className="text-6xl mb-6 animate-bounce">🇮🇹</div>
        </div>

        {/* Main Message */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg font-arabic-title">
            الصفحة غير موجودة!
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-arabic-body drop-shadow-md">
            Pagina non trovata
          </p>
        </div>

        {/* Funny Message */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 border border-white/30">
          <p className="text-lg text-white font-arabic-body mb-4">
            عذراً! يبدو أنك وجدت مكاناً غير موجود في منصة إيتالينا. 
          </p>
          <p className="text-base text-white/80 font-arabic-body">
            ربما حاولت الوصول إلى درس لم يتم نشره بعد، أو ربما حدث خطأ في الرابط. 
            لا تقلق، نحن هنا لمساعدتك!
          </p>
        </div>

        {/* Italian Fun Fact */}
        <div className="bg-accent/30 backdrop-blur-md rounded-xl p-4 md:p-6 mb-8 border border-accent/50">
          <p className="text-sm md:text-base text-white font-italic mb-2">
            💡 <strong>حقيقة مثيرة:</strong>
          </p>
          <p className="text-white/90 font-arabic-body text-sm md:text-base">
            في الإيطالية، كلمة "Scusa" تعني "آسف" أو "معذرة". 
            فلنقل: <strong>Scusa!</strong> 😊
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {/* Go Home Button */}
          <Link href="/">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-5 h-5 ml-2" />
              العودة للرئيسية
            </Button>
          </Link>

          {/* Go to Courses Button */}
          <Link href="/courses">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
            >
              الدروس
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
          </Link>

          {/* Sound Button */}
          <Button
            size="lg"
            variant="ghost"
            onClick={playSound}
            className="text-white hover:bg-white/20 font-bold text-lg px-8 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
            title="استمع إلى النطق الإيطالي"
          >
            <Volume2 className="w-5 h-5 ml-2" />
            استمع
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-white/70 font-arabic-body text-sm md:text-base">
          <p>
            إذا استمرت المشكلة، يرجى التواصل مع فريق الدعم: 
            <a
              href="mailto:support@italina.io"
              className="text-white hover:text-white/90 underline ml-2"
            >
              support@italina.io
            </a>
          </p>
        </div>

        {/* Decorative Italian Phrases */}
        <div className="mt-12 space-y-2 text-white/60 font-italic text-sm">
          <p>Arrivederci! 👋</p>
          <p>Buona fortuna con i tuoi studi! 🍀</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-8 left-8 text-6xl animate-bounce opacity-50 pointer-events-none">
        🍝
      </div>
      <div className="fixed top-8 right-8 text-6xl animate-pulse opacity-50 pointer-events-none">
        🎭
      </div>
    </div>
  );
};

export default NotFound;
