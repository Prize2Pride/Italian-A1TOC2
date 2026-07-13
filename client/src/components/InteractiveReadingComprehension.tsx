import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Sentence {
  italian: string;
  arabic: string;
  revealed: boolean;
}

interface InteractiveReadingComprehensionProps {
  title: string;
  sentences: string[];
  translations: string[];
}

export function InteractiveReadingComprehension({
  title,
  sentences,
  translations,
}: InteractiveReadingComprehensionProps) {
  const [revealedSentences, setRevealedSentences] = useState<boolean[]>(
    new Array(sentences.length).fill(false)
  );

  const toggleReveal = (index: number) => {
    const newRevealed = [...revealedSentences];
    newRevealed[index] = !newRevealed[index];
    setRevealedSentences(newRevealed);
  };

  const revealAll = () => {
    setRevealedSentences(new Array(sentences.length).fill(true));
  };

  const hideAll = () => {
    setRevealedSentences(new Array(sentences.length).fill(false));
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={revealAll}
            className="text-xs"
          >
            إظهار الكل
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={hideAll}
            className="text-xs"
          >
            إخفاء الكل
          </Button>
        </div>
      </div>

      <Card className="p-6 bg-card text-card-foreground space-y-4">
        <div className="space-y-3">
          {sentences.map((sentence, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 bg-background/50 hover:bg-background/80 transition-colors"
            >
              {/* Italian Text */}
              <p className="text-lg font-semibold text-foreground mb-3 leading-relaxed">
                {sentence}
              </p>

              {/* Translation Button */}
              <button
                onClick={() => toggleReveal(index)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                {revealedSentences[index] ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    إخفاء الترجمة
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    اضغط لإظهار الترجمة
                  </>
                )}
              </button>

              {/* Arabic Translation - Hidden by default */}
              {revealedSentences[index] && (
                <div className="mt-3 p-3 bg-primary/10 rounded-md border border-primary/20">
                  <p className="text-base text-foreground leading-relaxed">
                    {translations[index]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          تم الكشف عن {revealedSentences.filter(Boolean).length} من{' '}
          {sentences.length} جملة
        </span>
        <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${(revealedSentences.filter(Boolean).length / sentences.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Tips */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <p className="text-sm text-foreground">
          💡 <strong>نصيحة:</strong> حاول فهم الجملة الإيطالية أولاً قبل الضغط على الترجمة. هذا يساعدك على التعلم بشكل أفضل!
        </p>
      </div>
    </div>
  );
}
