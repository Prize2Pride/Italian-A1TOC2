import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface FamilyRelation {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const familyQuestions: FamilyRelation[] = [
  {
    question: 'من هو والد ابنتي؟',
    options: ['الجد', 'الأب', 'الأخ', 'العم'],
    correctAnswer: 1,
    explanation: 'والد ابنتك هو أنت! في الإيطالية: "Il padre di mia figlia sono io!"',
  },
  {
    question: 'من هي والدة ابني؟',
    options: ['الجدة', 'الأم', 'الأخت', 'العمة'],
    correctAnswer: 1,
    explanation: 'والدة ابنك هي أنت! في الإيطالية: "La madre di mio figlio sono io!"',
  },
  {
    question: 'من هو والد والدي؟',
    options: ['الجد الأكبر', 'الجد', 'الأب', 'العم'],
    correctAnswer: 1,
    explanation: 'والد والدك هو جدك. في الإيطالية: "Il padre di mio padre è mio nonno."',
  },
  {
    question: 'من هي أخت والدي؟',
    options: ['الجدة', 'الأم', 'العمة', 'الخالة'],
    correctAnswer: 2,
    explanation: 'أخت والدك هي عمتك. في الإيطالية: "La sorella di mio padre è mia zia."',
  },
  {
    question: 'من هو أخ والدتي؟',
    options: ['الجد', 'العم', 'الأب', 'الأخ'],
    correctAnswer: 1,
    explanation: 'أخ والدتك هو خالك أو عمك. في الإيطالية: "Il fratello di mia madre è mio zio."',
  },
  {
    question: 'من هي والدة والدتي؟',
    options: ['الأم', 'الجدة', 'العمة', 'الخالة'],
    correctAnswer: 1,
    explanation: 'والدة والدتك هي جدتك. في الإيطالية: "La madre di mia madre è mia nonna."',
  },
  {
    question: 'من هو ابن أخي؟',
    options: ['الأخ', 'ابن العم', 'الابن', 'الحفيد'],
    correctAnswer: 1,
    explanation: 'ابن أخيك هو ابن عمك. في الإيطالية: "Il figlio di mio fratello è mio cugino."',
  },
  {
    question: 'من هي ابنة أختي؟',
    options: ['الأخت', 'ابنة العم', 'الابنة', 'الحفيدة'],
    correctAnswer: 1,
    explanation: 'ابنة أختك هي ابنة عمتك. في الإيطالية: "La figlia di mia sorella è mia cugina."',
  },
];

interface FamilyGuessingGameProps {
  onComplete?: (score: number, total: number) => void;
}

export function FamilyGuessingGame({ onComplete }: FamilyGuessingGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const question = familyQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswer = (index: number) => {
    if (!answered) {
      setSelectedAnswer(index);
      setAnswered(true);
      if (index === question.correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < familyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setGameComplete(true);
      if (onComplete) {
        onComplete(score + (isCorrect ? 1 : 0), familyQuestions.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setGameComplete(false);
  };

  if (gameComplete) {
    const finalScore = score + (isCorrect ? 1 : 0);
    const percentage = Math.round((finalScore / familyQuestions.length) * 100);

    return (
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary">
        <div className="text-center space-y-6">
          <div className="text-6xl">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-foreground">النتيجة النهائية</h2>
          <div className="text-5xl font-bold text-primary">
            {finalScore} / {familyQuestions.length}
          </div>
          <p className="text-xl text-muted-foreground">
            {percentage >= 80
              ? 'ممتاز! أنت خبير في العلاقات العائلية! 🌟'
              : percentage >= 60
              ? 'جيد جداً! استمر في التدريب! 📚'
              : 'لا تقلق، حاول مرة أخرى! 💪'}
          </p>
          <Button
            onClick={handleRestart}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <RotateCcw className="w-5 h-5 ml-2" />
            إعادة اللعبة
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>السؤال {currentQuestion + 1} من {familyQuestions.length}</span>
          <span>النقاط: {score}</span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / familyQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-8 bg-card border-2 border-primary/20">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={answered}
              className={`p-4 rounded-lg border-2 transition-all font-bold text-lg ${
                !answered
                  ? 'border-border hover:border-primary hover:bg-primary/5 cursor-pointer'
                  : selectedAnswer === index
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : 'border-red-500 bg-red-50 text-red-900'
                  : index === question.correctAnswer
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : 'border-border opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {answered && (
                  <>
                    {index === question.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {selectedAnswer === index && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {answered && (
          <div
            className={`p-4 rounded-lg border-l-4 ${
              isCorrect
                ? 'bg-green-50 border-green-500 text-green-900'
                : 'bg-red-50 border-red-500 text-red-900'
            }`}
          >
            <p className="font-semibold mb-2">
              {isCorrect ? '✅ صحيح!' : '❌ خطأ!'}
            </p>
            <p>{question.explanation}</p>
          </div>
        )}
      </Card>

      {/* Next Button */}
      {answered && (
        <Button
          onClick={handleNext}
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {currentQuestion === familyQuestions.length - 1
            ? 'عرض النتائج'
            : 'السؤال التالي'}
        </Button>
      )}
    </div>
  );
}
