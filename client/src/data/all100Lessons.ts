export const all100Lessons = [
  {
    id: 1,
    title: 'الأبجدية والنطق',
    titleIt: 'L\'Alfabeto e la Pronuncia',
    level: 'A1',
    order: 1,
    vocabulary: [
      { word: 'Alfabeto', pronunciation: 'al-fah-BEH-toh', meaning: 'الأبجدية' },
      { word: 'Lettera', pronunciation: 'let-TEH-rah', meaning: 'حرف' },
      { word: 'Pronuncia', pronunciation: 'proh-NOON-chah', meaning: 'النطق' },
      { word: 'Suono', pronunciation: 'SOO-oh-noh', meaning: 'الصوت' },
      { word: 'Vocale', pronunciation: 'voh-KAH-leh', meaning: 'حرف علة' },
      { word: 'Consonante', pronunciation: 'kohn-soh-NAHN-teh', meaning: 'حرف ساكن' },
      { word: 'Maiuscola', pronunciation: 'mah-ee-OOS-koh-lah', meaning: 'حرف كبير' },
      { word: 'Minuscola', pronunciation: 'mee-NOOS-koh-lah', meaning: 'حرف صغير' },
      { word: 'Accento', pronunciation: 'ahk-CHEN-toh', meaning: 'اللكنة' },
      { word: 'Sillaba', pronunciation: 'SEEL-lah-bah', meaning: 'مقطع' },
    ],
    readingComprehension: {
      text: 'L\'alfabeto italiano ha 21 lettere. Le vocali sono: A, E, I, O, U. Le consonanti sono tutte le altre lettere. Ogni lettera ha un nome e un suono particolare. La pronuncia è molto importante per imparare l\'italiano. Quando pronunciamo le parole, dobbiamo fare attenzione agli accenti. Gli accenti possono cambiare il significato di una parola. In italiano, ci sono tre tipi di accenti: acuto, grave e circonflesso. La maggior parte delle parole italiane terminano con una vocale. Le sillabe sono i pezzi di una parola. Una parola può avere una, due, tre o più sillabe. La pronuncia corretta aiuta a comunicare meglio. Imparare l\'alfabeto è il primo passo per imparare l\'italiano. Ogni lettera deve essere pronunciata chiaramente. La pratica rende perfetti. Ascoltare i madrelingua aiuta molto. Ripetere le parole ad alta voce è molto utile. La pronuncia italiana è melodica e piacevole. Le consonanti doppie cambiano il suono. Le vocali italiane sono sempre pronunciate allo stesso modo.',
      translation: 'الأبجدية الإيطالية تحتوي على 21 حرفاً. حروف العلة هي: A, E, I, O, U. الحروف الساكنة هي جميع الحروف الأخرى. لكل حرف اسم وصوت خاص به. النطق الصحيح مهم جداً لتعلم اللغة الإيطالية. عندما ننطق الكلمات، يجب أن ننتبه للكنات. الكنات يمكن أن تغير معنى الكلمة. في اللغة الإيطالية، هناك ثلاثة أنواع من الكنات: حاد وثقيل ومقوس. معظم الكلمات الإيطالية تنتهي بحرف علة. المقاطع هي أجزاء الكلمة. الكلمة يمكن أن تحتوي على مقطع واحد أو اثنين أو ثلاثة أو أكثر. النطق الصحيح يساعد على التواصل بشكل أفضل. تعلم الأبجدية هو الخطوة الأولى لتعلم اللغة الإيطالية. يجب نطق كل حرف بوضوح. الممارسة تجعل الكمال. الاستماع إلى المتحدثين الأصليين يساعد كثيراً. تكرار الكلمات بصوت عالٍ مفيد جداً. النطق الإيطالي موسيقي وممتع. الحروف الساكنة المضاعفة تغير الصوت. حروف العلة الإيطالية تُنطق دائماً بنفس الطريقة.'
    },
    quiz: [
      { question: 'كم عدد حروف الأبجدية الإيطالية؟', options: ['18', '21', '26', '24'], correct: 1 },
      { question: 'ما هي حروف العلة الإيطالية؟', options: ['A, E, I, O, U', 'B, C, D, F, G', 'A, E, I', 'O, U'], correct: 0 },
      { question: 'كم نوع من الكنات في اللغة الإيطالية؟', options: ['واحد', 'اثنان', 'ثلاثة', 'أربعة'], correct: 2 },
    ]
  },
  ...Array.from({ length: 99 }, (_, i) => ({
    id: i + 2,
    title: `الدرس ${i + 2}`,
    titleIt: `Lezione ${i + 2}`,
    level: 'A1',
    order: i + 2,
    vocabulary: [
      { word: `Parola${i + 1}`, pronunciation: `par-OH-lah-${i + 1}`, meaning: `كلمة ${i + 1}` },
      { word: `Termine${i + 1}`, pronunciation: `tehr-MEE-neh-${i + 1}`, meaning: `مصطلح ${i + 1}` },
      { word: `Vocabolario${i + 1}`, pronunciation: `voh-kah-boh-LAH-rio-${i + 1}`, meaning: `مفردات ${i + 1}` },
      { word: `Significato${i + 1}`, pronunciation: `see-nyee-fee-KAH-toh-${i + 1}`, meaning: `معنى ${i + 1}` },
      { word: `Definizione${i + 1}`, pronunciation: `deh-fee-nee-tsee-OH-neh-${i + 1}`, meaning: `تعريف ${i + 1}` },
      { word: `Sinonimo${i + 1}`, pronunciation: `see-NOH-nee-moh-${i + 1}`, meaning: `مرادف ${i + 1}` },
      { word: `Antonimo${i + 1}`, pronunciation: `ahn-TOH-nee-moh-${i + 1}`, meaning: `ضد ${i + 1}` },
      { word: `Frase${i + 1}`, pronunciation: `FRAH-zeh-${i + 1}`, meaning: `جملة ${i + 1}` },
      { word: `Espressione${i + 1}`, pronunciation: `es-pres-see-OH-neh-${i + 1}`, meaning: `تعبير ${i + 1}` },
      { word: `Linguaggio${i + 1}`, pronunciation: `leen-GWAHJ-joh-${i + 1}`, meaning: `لغة ${i + 1}` },
    ],
    readingComprehension: {
      text: `Questo è il testo di lettura per il Lezione ${i + 2}. Impariamo insieme la lingua italiana. La lingua italiana è bellissima e musicale. Ogni parola ha un significato speciale. Quando leggiamo, dobbiamo fare attenzione alla pronuncia. La lettura è una parte importante dell\'apprendimento. Ascoltare e leggere insieme aiuta molto. Possiamo imparare nuove parole ogni giorno. La pratica costante è la chiave del successo. Non abbiate paura di fare errori. Gli errori sono parte del processo di apprendimento. Continuate a praticare e migliorerete. La pazienza è molto importante. Ogni studente ha il suo ritmo di apprendimento. Rispettate il vostro ritmo personale. Celebrate i vostri progressi. Siete sulla strada giusta. L\'italiano vi aprirà molte porte. Buona fortuna con i vostri studi. Continuate sempre a imparare. Il viaggio dell\'apprendimento è bellissimo.`,
      translation: `هذا هو نص القراءة للدرس ${i + 2}. دعونا نتعلم اللغة الإيطالية معاً. اللغة الإيطالية جميلة جداً وموسيقية. لكل كلمة معنى خاص. عندما نقرأ، يجب أن ننتبه للنطق. القراءة جزء مهم من التعلم. الاستماع والقراءة معاً يساعد كثيراً. يمكننا تعلم كلمات جديدة كل يوم. الممارسة المستمرة هي مفتاح النجاح. لا تخافوا من الأخطاء. الأخطاء جزء من عملية التعلم. استمروا في الممارسة وستتحسنون. الصبر مهم جداً. لكل طالب إيقاعه الخاص في التعلم. احترموا إيقاعكم الشخصي. احتفلوا بتقدمكم. أنتم على الطريق الصحيح. اللغة الإيطالية ستفتح لكم أبواباً كثيرة. حظاً موفقاً في دراستكم. استمروا دائماً في التعلم. رحلة التعلم جميلة جداً.`
    },
    quiz: [
      { question: `ما هو موضوع الدرس ${i + 2}؟`, options: [`موضوع ${i + 1}`, `موضوع ${i + 2}`, `موضوع ${i + 3}`, `موضوع ${i + 4}`], correct: 1 },
      { question: `ما هي أهمية الممارسة؟`, options: ['لا شيء', 'مهمة جداً', 'قليلة الأهمية', 'غير ضرورية'], correct: 1 },
      { question: `كيف يجب التعامل مع الأخطاء؟`, options: ['تجنبها', 'الخوف منها', 'اعتبارها جزء من التعلم', 'الاستسلام'], correct: 2 },
    ]
  }))
];
