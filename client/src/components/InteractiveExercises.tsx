import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface Exercise {
  id: string;
  type: 'fill-blank' | 'match' | 'multiple-choice';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

const exercises: Exercise[] = [
  {
    id: '1',
    type: 'fill-blank',
    question: 'Io _____ mangiare una pizza. (أستطيع)',
    correctAnswer: 'posso',
    explanation: 'التصريف الصحيح للفعل "potere" مع الضمير "Io" هو "posso"',
    hint: 'استخدم الفعل الشرطي "potere"',
  },
  {
    id: '2',
    type: 'multiple-choice',
    question: 'Tu _____ andare al cinema? (هل تريد)',
    options: ['vuoi', 'voglio', 'vuole', 'vogliono'],
    correctAnswer: 'vuoi',
    explanation: 'التصريف الصحيح للفعل "volere" مع الضمير "Tu" هو "vuoi"',
  },
  {
    id: '3',
    type: 'fill-blank',
    question: 'Noi _____ studiare l\'italiano. (يجب علينا)',
    correctAnswer: 'dobbiamo',
    explanation: 'التصريف الصحيح للفعل "dovere" مع الضمير "Noi" هو "dobbiamo"',
    hint: 'استخدم الفعل الشرطي "dovere"',
  },
  {
    id: '4',
    type: 'multiple-choice',
    question: 'Loro _____ venire alla festa. (يستطيعون)',
    options: ['possiamo', 'possono', 'posso', 'puoi'],
    correctAnswer: 'possono',
    explanation: 'التصريف الصحيح للفعل "potere" مع الضمير "Loro" هو "possono"',
  },
  {
    id: '5',
    type: 'fill-blank',
    question: 'Voi _____ finire i compiti. (يجب عليكم)',
    correctAnswer: 'dovete',
    explanation: 'التصريف الصحيح للفعل "dovere" مع الضمير "Voi" هو "dovete"',
    hint: 'استخدم الفعل الشرطي "dovere"',
  },
  {
    id: '6',
    type: 'multiple-choice',
    question: 'Lui _____ giocare a calcio. (يريد)',
    options: ['vogliamo', 'vuole', 'vuoi', 'vogliono'],
    correctAnswer: 'vuole',
    explanation: 'التصريف الصحيح للفعل "volere" مع الضمير "Lui/Lei" هو "vuole"',
  },
  {
    id: '7',
    type: 'fill-blank',
    question: 'Lei _____ bere un caffè. (تستطيع)',
    correctAnswer: 'può',
    explanation: 'التصريف الصحيح للفعل "potere" مع الضمير "Lei" هو "può"',
    hint: 'استخدم الفعل الشرطي "potere"',
  },
  {
    id: '8',
    type: 'multiple-choice',
    question: 'Io _____ leggere un libro. (أريد)',
    options: ['voglio', 'vuoi', 'vuole', 'vogliono'],
    correctAnswer: 'voglio',
    explanation: 'التصريف الصحيح للفعل "volere" مع الضمير "Io" هو "voglio"',
  },
];

interface InteractiveExercisesProps {
  onComplete?: (score: number, total: number) => void;
}

export function InteractiveExercises({ onComplete }: InteractiveExercisesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const exercise = exercises[currentIndex];
  const isCorrect =
    selectedAnswer === exercise.correctAnswer ||
    userInput.toLowerCase().trim() === exercise.correctAnswer.toLowerCase();

  const handleAnswer = (answer: string) => {
    if (!answered) {
      setSelectedAnswer(answer);
      setAnswered(true);
      if (answer === exercise.correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleInputSubmit = () => {
    if (!answered && userInput.trim()) {
      setAnswered(true);
      if (
        userInput.toLowerCase().trim() ===
        exercise.correctAnswer.toLowerCase()
      ) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setUserInput('');
      setShowHint(false);
    } else {
      setGameComplete(true);
      if (onComplete) {
        onComplete(score + (isCorrect ? 1 : 0), exercises.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setUserInput('');
    setGameComplete(false);
    setShowHint(false);
  };

  if (gameComplete) {
    const finalScore = score + (isCorrect ? 1 : 0);
    const percentage = Math.round((finalScore / exercises.length) * 100);

    return (
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary">
        <div className="text-center space-y-6">
          <div className="text-6xl">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            النتيجة النهائية - التمارين التفاعلية
          </h2>
          <div className="text-5xl font-bold text-primary">
            {finalScore} / {exercises.length}
          </div>
          <p className="text-xl text-muted-foreground">
            {percentage >= 80
              ? 'ممتاز! أنت متقن للقواعس والمفردات! 🌟'
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
            إعادة التمارين
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
          <span>
            التمرين {currentIndex + 1} من {exercises.length}
          </span>
          <span>النقاط: {score}</span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / exercises.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Exercise Card */}
      <Card className="p-8 bg-card border-2 border-primary/20">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {exercise.question}
        </h2>

        {/* Fill in the Blank */}
        {exercise.type === 'fill-blank' && (
          <div className="space-y-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
              placeholder="اكتب الإجابة هنا..."
              disabled={answered}
              className="w-full p-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary disabled:opacity-50"
            />
            {!answered && (
              <div className="flex gap-2">
                <Button
                  onClick={handleInputSubmit}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  تحقق
                </Button>
                {exercise.hint && (
                  <Button
                    onClick={() => setShowHint(!showHint)}
                    variant="outline"
                    className="flex-1"
                  >
                    {showHint ? 'إخفاء التلميح' : 'عرض التلميح'}
                  </Button>
                )}
              </div>
            )}
            {showHint && exercise.hint && (
              <div className="p-3 bg-accent/20 border border-accent/50 rounded-lg">
                <p className="text-sm text-foreground">💡 {exercise.hint}</p>
              </div>
            )}
          </div>
        )}

        {/* Multiple Choice */}
        {exercise.type === 'multiple-choice' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {exercise.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                className={`p-4 rounded-lg border-2 transition-all font-bold text-lg ${
                  !answered
                    ? 'border-border hover:border-primary hover:bg-primary/5 cursor-pointer'
                    : selectedAnswer === option
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-red-500 bg-red-50 text-red-900'
                    : option === exercise.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : 'border-border opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {answered && (
                    <>
                      {option === exercise.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {selectedAnswer === option && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

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
            <p>{exercise.explanation}</p>
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
          {currentIndex === exercises.length - 1
            ? 'عرض النتائج'
            : 'التمرين التالي'}
        </Button>
      )}
    </div>
  );
}
