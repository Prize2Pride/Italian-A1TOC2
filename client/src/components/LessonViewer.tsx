import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Volume2, CheckCircle2 } from 'lucide-react';
import { Streamdown } from 'streamdown';
import { InteractiveReadingComprehension } from './InteractiveReadingComprehension';

interface Vocabulary {
  word: string;
  pronunciation: string;
  meaning: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface ReadingComprehension {
  text: string;
  translation: string;
}

interface Lesson {
  id: number;
  title: string;
  titleIt: string;
  vocabulary?: Vocabulary[];
  readingComprehension?: ReadingComprehension;
  quiz?: QuizQuestion[];
  level?: string;
  order?: number;
}

interface LessonViewerProps {
  lesson: Lesson;
  onComplete?: () => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onComplete }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const handleMarkSectionComplete = (section: string) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    if (!quizSubmitted) {
      setQuizAnswers({
        ...quizAnswers,
        [questionIndex]: answerIndex,
      });
    }
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    handleMarkSectionComplete('quiz');
    if (onComplete) {
      onComplete();
    }
  };

  const calculateQuizScore = () => {
    if (!lesson.quiz || lesson.quiz.length === 0) return 0;
    let correct = 0;
    lesson.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        correct++;
      }
    });
    return Math.round((correct / lesson.quiz.length) * 100);
  };

  const completionPercentage = Math.round((completedSections.length / 4) * 100);

  return (
    <div className="w-full rtl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">التقدم الكلي</span>
          <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>

      <Tabs defaultValue="vocabulary" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="vocabulary" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">المفردات</span>
          </TabsTrigger>
          <TabsTrigger value="reading" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">قراءة</span>
          </TabsTrigger>
          <TabsTrigger value="grammar" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">قواعس</span>
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">اختبار</span>
          </TabsTrigger>
        </TabsList>

        {/* Vocabulary Tab */}
        <TabsContent value="vocabulary" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">المفردات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.vocabulary?.map((vocab, idx) => (
                <Card key={idx} className="p-4 bg-card border-2 border-primary/20 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-lg font-bold text-primary">{vocab.word}</p>
                      <p className="text-sm text-muted-foreground italic">{vocab.pronunciation}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:bg-primary/10"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-foreground font-medium">{vocab.meaning}</p>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => handleMarkSectionComplete('vocabulary')}
              disabled={completedSections.includes('vocabulary')}
              className="mt-6 w-full"
            >
              {completedSections.includes('vocabulary') ? '✓ تم إكمال المفردات' : 'تم فهم المفردات'}
            </Button>
          </Card>
        </TabsContent>

        {/* Reading Comprehension Tab */}
        <TabsContent value="reading" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">القراءة والفهم</h2>
            {lesson.readingComprehension && (
              <InteractiveReadingComprehension
                title={lesson.title}
                sentences={lesson.readingComprehension.text.split('. ')}
                translations={lesson.readingComprehension.translation.split('. ')}
              />
            )}
            <Button
              onClick={() => handleMarkSectionComplete('reading')}
              disabled={completedSections.includes('reading')}
              className="mt-6 w-full"
            >
              {completedSections.includes('reading') ? '✓ تم إكمال القراءة' : 'تم فهم النص'}
            </Button>
          </Card>
        </TabsContent>

        {/* Grammar Tab */}
        <TabsContent value="grammar" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">القواعس النحوية</h2>
            <div className="prose prose-invert max-w-none">
              <Streamdown>
                {`## ${lesson.titleIt}

### المفاهيم الأساسية

هذا الدرس يغطي المفاهيم الأساسية للمستوى A1 في اللغة الإيطالية.

- **النطق**: من المهم جداً تعلم النطق الصحيح
- **المفردات**: ركز على حفظ الكلمات الأساسية
- **القواعس**: افهم القواعس قبل التطبيق

### نصائح للتعلم

1. استمع إلى المتحدثين الأصليين
2. كرر الكلمات بصوت عالٍ
3. اكتب الكلمات الجديدة
4. استخدم الكلمات في جمل`}
              </Streamdown>
            </div>
            <Button
              onClick={() => handleMarkSectionComplete('grammar')}
              disabled={completedSections.includes('grammar')}
              className="mt-6 w-full"
            >
              {completedSections.includes('grammar') ? '✓ تم إكمال القواعس' : 'تم فهم القواعس'}
            </Button>
          </Card>
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">الاختبار</h2>
            {lesson.quiz && lesson.quiz.length > 0 ? (
              <div className="space-y-6">
                {lesson.quiz.map((question, qIdx) => (
                  <Card key={qIdx} className="p-4 bg-card border-2 border-border">
                    <h3 className="text-lg font-bold mb-4 text-foreground">
                      {qIdx + 1}. {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, oIdx) => (
                        <Button
                          key={oIdx}
                          variant={
                            quizAnswers[qIdx] === oIdx
                              ? 'default'
                              : quizSubmitted && oIdx === question.correct
                              ? 'default'
                              : 'outline'
                          }
                          className={`w-full justify-start text-right ${
                            quizSubmitted && oIdx === question.correct
                              ? 'bg-green-600 hover:bg-green-700'
                              : quizSubmitted && quizAnswers[qIdx] === oIdx && oIdx !== question.correct
                              ? 'bg-red-600 hover:bg-red-700'
                              : ''
                          }`}
                          onClick={() => handleQuizAnswer(qIdx, oIdx)}
                          disabled={quizSubmitted}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </Card>
                ))}

                {quizSubmitted && (
                  <Card className="p-4 bg-primary/10 border-2 border-primary">
                    <p className="text-lg font-bold text-primary">
                      درجتك: {calculateQuizScore()}%
                    </p>
                  </Card>
                )}

                <Button
                  onClick={handleSubmitQuiz}
                  disabled={quizSubmitted}
                  className="w-full"
                >
                  {quizSubmitted ? '✓ تم إرسال الاختبار' : 'إرسال الاختبار'}
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">لا توجد أسئلة اختبار لهذا الدرس</p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LessonViewer;
