import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface ConjugationExercise {
  pronoun: string;
  verb: string;
  correctAnswer: string;
  options: string[];
  english: string;
}

const modalVerbs = {
  potere: {
    name: 'Potere (يستطيع)',
    conjugations: {
      'Io': 'posso',
      'Tu': 'puoi',
      'Lui/Lei': 'può',
      'Noi': 'possiamo',
      'Voi': 'potete',
      'Loro': 'possono',
    },
  },
  dovere: {
    name: 'Dovere (يجب)',
    conjugations: {
      'Io': 'devo',
      'Tu': 'devi',
      'Lui/Lei': 'deve',
      'Noi': 'dobbiamo',
      'Voi': 'dovete',
      'Loro': 'devono',
    },
  },
  volere: {
    name: 'Volere (يريد)',
    conjugations: {
      'Io': 'voglio',
      'Tu': 'vuoi',
      'Lui/Lei': 'vuole',
      'Noi': 'vogliamo',
      'Voi': 'volete',
      'Loro': 'vogliono',
    },
  },
};

const generateExercises = (): ConjugationExercise[] => {
  const exercises: ConjugationExercise[] = [];
  const pronouns = ['Io', 'Tu', 'Lui/Lei', 'Noi', 'Voi', 'Loro'];
  const verbKeys = Object.keys(modalVerbs) as Array<keyof typeof modalVerbs>;

  for (const verbKey of verbKeys) {
    const verb = modalVerbs[verbKey];
    for (const pronoun of pronouns) {
      const correctAnswer =
        verb.conjugations[pronoun as keyof typeof verb.conjugations];
      const allAnswers = Object.values(verb.conjugations);
      const wrongAnswers = allAnswers.filter((a) => a !== correctAnswer);
      const options = [
        correctAnswer,
        ...wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 2),
      ].sort(() => Math.random() - 0.5);

      exercises.push({
        pronoun,
        verb: verb.name,
        correctAnswer,
        options,
        english: `${pronoun} ${verb.name.split('(')[0].trim()}...`,
      });
    }
  }

  return exercises.sort(() => Math.random() - 0.5);
};

interface ModalVerbConjugationProps {
  onComplete?: (score: number, total: number) => void;
}

export function ModalVerbConjugation({ onComplete }: ModalVerbConjugationProps) {
  const [exercises] = useState(generateExercises());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const exercise = exercises[currentIndex];
  const isCorrect = selectedAnswer === exercise.correctAnswer;

  const handleAnswer = (answer: string) => {
    if (!answered) {
      setSelectedAnswer(answer);
      setAnswered(true);
      if (answer === exercise.correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
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
    setGameComplete(false);
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
            النتيجة النهائية - تصريف الأفعال الشرطية
          </h2>
          <div className="text-5xl font-bold text-primary">
            {finalScore} / {exercises.length}
          </div>
          <p className="text-xl text-muted-foreground">
            {percentage >= 80
              ? 'ممتاز! أنت متقن للأفعال الشرطية! 🌟'
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
            إعادة التمرين
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
        <div className="mb-6">
          <Badge className="bg-primary/20 text-primary mb-4">
            {exercise.verb}
          </Badge>
          <h2 className="text-3xl font-bold text-foreground">
            {exercise.pronoun}
          </h2>
        </div>

        <p className="text-lg text-muted-foreground mb-8">
          اختر التصريف الصحيح للفعل:
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {exercise.options.map((option, index) => (
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
                <span className="text-xl">{option}</span>
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
            <p className="mb-2">
              التصريف الصحيح: <strong>{exercise.correctAnswer}</strong>
            </p>
            <p className="text-sm">
              المثال: {exercise.pronoun} {exercise.correctAnswer} mangiare una pizza.
            </p>
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
