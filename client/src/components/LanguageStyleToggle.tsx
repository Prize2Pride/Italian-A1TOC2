import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export type ItalianStyle = 'street' | 'casual' | 'informal' | 'formal' | 'elegant';

interface LanguageStyleToggleProps {
  onStyleChange?: (style: ItalianStyle) => void;
  currentStyle?: ItalianStyle;
}

const styleDescriptions: Record<ItalianStyle, { label: string; description: string; emoji: string }> = {
  street: {
    label: 'عامية الشارع',
    description: 'لغة الشارع والعامية الإيطالية',
    emoji: '🚶',
  },
  casual: {
    label: 'عامية',
    description: 'لغة غير رسمية وودية',
    emoji: '😎',
  },
  informal: {
    label: 'غير رسمية',
    description: 'لغة يومية طبيعية',
    emoji: '👋',
  },
  formal: {
    label: 'رسمية',
    description: 'لغة احترافية واحترام',
    emoji: '🎩',
  },
  elegant: {
    label: 'راقية',
    description: 'لغة عالية الجودة وأدبية',
    emoji: '👑',
  },
};

const LanguageStyleToggle: React.FC<LanguageStyleToggleProps> = ({ onStyleChange, currentStyle = 'informal' }) => {
  const [selectedStyle, setSelectedStyle] = useState<ItalianStyle>(currentStyle);

  const handleStyleChange = (value: string) => {
    if (value && (value === 'street' || value === 'casual' || value === 'informal' || value === 'formal' || value === 'elegant')) {
      setSelectedStyle(value);
      onStyleChange?.(value);
    }
  };

  return (
    <div className="flex flex-col gap-4 rtl">
      <div className="flex items-center justify-between">
        <h3 className="font-arabic-title text-lg font-bold text-foreground">أسلوب اللغة الإيطالية</h3>
      </div>

      <ToggleGroup
        type="single"
        value={selectedStyle}
        onValueChange={handleStyleChange}
        className="flex flex-wrap gap-2 justify-start"
      >
        {(Object.keys(styleDescriptions) as ItalianStyle[]).map((style) => (
          <Tooltip key={style}>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value={style}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedStyle === style
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-card-foreground hover:border-primary'
                }`}
              >
                <span className="text-xl">{styleDescriptions[style].emoji}</span>
                <span className="font-arabic-body font-semibold">{styleDescriptions[style].label}</span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent side="top" className="rtl">
              {styleDescriptions[style].description}
            </TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup>

      <div className="p-4 bg-accent/10 border border-accent rounded-lg">
        <p className="font-arabic-body text-sm text-foreground">
          <strong>الأسلوب الحالي:</strong> {styleDescriptions[selectedStyle].description}
        </p>
      </div>
    </div>
  );
};

export default LanguageStyleToggle;
