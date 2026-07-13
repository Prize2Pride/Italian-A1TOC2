import mysql from 'mysql2/promise';

const lessonsData = [
  {
    title: 'الأبجدية والنطق',
    titleItalian: 'L\'alfabeto e la pronuncia',
    description: 'تعلم الأبجدية الإيطالية وكيفية نطق الحروف بشكل صحيح',
    order: 1,
    vocabulary: [
      { word: 'A', translation: 'ألف', pronunciation: 'a' },
      { word: 'B', translation: 'بي', pronunciation: 'bi' },
      { word: 'C', translation: 'تشي', pronunciation: 'chi' },
      { word: 'D', translation: 'دي', pronunciation: 'di' },
      { word: 'E', translation: 'إي', pronunciation: 'e' },
    ],
    grammar: 'الأبجدية الإيطالية تتكون من 21 حرفاً. النطق الإيطالي يتميز بوضوح الحروف والمقاطع.',
    readingComprehension: 'L\'alfabeto italiano è composto da ventuno lettere. Ogni lettera ha un suono specifico. La pronuncia è molto importante per imparare bene la lingua. A, B, C, D, E, F, G, H, I, L, M, N, O, P, Q, R, S, T, U, V, Z. Questi sono i suoni fondamentali della lingua italiana.',
    readingComprehensionTranslation: 'الأبجدية الإيطالية تتكون من واحد وعشرين حرفاً. لكل حرف صوت محدد. النطق مهم جداً لتعلم اللغة بشكل جيد. هذه هي الأصوات الأساسية للغة الإيطالية.',
    quizQuestions: [
      { id: '1', type: 'true-false', question: 'الأبجدية الإيطالية تحتوي على 26 حرفاً', correctAnswer: 0 },
      { id: '2', type: 'multiple-choice', question: 'كم عدد حروف الأبجدية الإيطالية؟', options: ['20', '21', '22', '23'], correctAnswer: 1 },
      { id: '3', type: 'true-false', question: 'النطق الإيطالي واضح جداً', correctAnswer: 1 },
    ],
  },
  {
    title: 'الضمائر الشخصية',
    titleItalian: 'I pronomi personali',
    description: 'تعلم الضمائر الشخصية في اللغة الإيطالية',
    order: 2,
    vocabulary: [
      { word: 'Io', translation: 'أنا', pronunciation: 'io' },
      { word: 'Tu', translation: 'أنت', pronunciation: 'tu' },
      { word: 'Lui', translation: 'هو', pronunciation: 'lui' },
      { word: 'Lei', translation: 'هي', pronunciation: 'lei' },
      { word: 'Noi', translation: 'نحن', pronunciation: 'noi' },
    ],
    grammar: 'الضمائر الشخصية: Io (أنا)، Tu (أنت)، Lui/Lei (هو/هي)، Noi (نحن)، Voi (أنتم)، Loro (هم/هن)',
    readingComprehension: 'I pronomi personali sono importanti nella grammatica italiana. Io sono uno studente. Tu sei un insegnante. Lui è italiano. Lei è bella. Noi siamo amici. Voi siete studenti. Loro sono italiani. Questi pronomi si usano con i verbi per formare frasi complete.',
    readingComprehensionTranslation: 'الضمائر الشخصية مهمة في القواعس الإيطالية. أنا طالب. أنت معلم. هو إيطالي. هي جميلة. نحن أصدقاء. أنتم طلاب. هم إيطاليون. تُستخدم هذه الضمائر مع الأفعال لتكوين جمل كاملة.',
    quizQuestions: [
      { id: '1', type: 'multiple-choice', question: 'ما هو الضمير الشخصي لـ \"أنا\" بالإيطالية؟', options: ['Tu', 'Io', 'Lui', 'Noi'], correctAnswer: 1 },
      { id: '2', type: 'true-false', question: 'Loro تعني \"نحن\" بالإيطالية', correctAnswer: 0 },
      { id: '3', type: 'multiple-choice', question: 'ما معنى \"Lei\"؟', options: ['أنت', 'هو', 'هي', 'نحن'], correctAnswer: 2 },
    ],
  },
  {
    title: 'التعريف بالنفس',
    titleItalian: 'Presentarsi',
    description: 'كيفية التعريف بنفسك والآخرين باللغة الإيطالية',
    order: 3,
    vocabulary: [
      { word: 'Mi chiamo', translation: 'اسمي', pronunciation: 'mi kiamo' },
      { word: 'Sono', translation: 'أنا', pronunciation: 'sono' },
      { word: 'Piacere', translation: 'سعيد بالتعرف عليك', pronunciation: 'piacere' },
      { word: 'Italiano', translation: 'إيطالي', pronunciation: 'italiano' },
      { word: 'Lavoro', translation: 'أعمل', pronunciation: 'lavoro' },
    ],
    grammar: 'للتعريف بنفسك: \"Mi chiamo...\" (اسمي...). يمكنك أيضاً: \"Sono...\" (أنا...). \"Piacere\" تعني سعيد بالتعرف عليك.',
    readingComprehension: 'Ciao! Mi chiamo Marco. Sono italiano. Lavoro come insegnante. Piacere di conoscerti! Qual è il tuo nome? Da dove vieni? Che lavoro fai? Io sono felice di conoscerti. Mi piace parlare con le persone nuove. Raccontami di te!',
    readingComprehensionTranslation: 'مرحباً! اسمي ماركو. أنا إيطالي. أعمل معلماً. سعيد بالتعرف عليك! ما اسمك؟ من أين أنت؟ ما عملك؟ أنا سعيد بالتعرف عليك. أحب التحدث مع الأشخاص الجدد. أخبرني عن نفسك!',
    quizQuestions: [
      { id: '1', type: 'multiple-choice', question: 'كيف تقول \"اسمي\" بالإيطالية؟', options: ['Sono', 'Mi chiamo', 'Piacere', 'Lavoro'], correctAnswer: 1 },
      { id: '2', type: 'true-false', question: 'Piacere تعني \"أنا\" بالإيطالية', correctAnswer: 0 },
      { id: '3', type: 'multiple-choice', question: 'ما معنى \"Lavoro\"؟', options: ['أسكن', 'أعمل', 'أدرس', 'أسافر'], correctAnswer: 1 },
    ],
  },
  {
    title: 'الروتين اليومي',
    titleItalian: 'La routine quotidiana',
    description: 'تعلم كيفية وصف روتينك اليومي',
    order: 4,
    vocabulary: [
      { word: 'Svegliare', translation: 'الاستيقاظ', pronunciation: 'svegliare' },
      { word: 'Colazione', translation: 'الإفطار', pronunciation: 'colazione' },
      { word: 'Lavoro', translation: 'العمل', pronunciation: 'lavoro' },
      { word: 'Pranzo', translation: 'الغداء', pronunciation: 'pranzo' },
      { word: 'Cena', translation: 'العشاء', pronunciation: 'cena' },
    ],
    grammar: 'لوصف روتينك: \"Mi sveglio alle 7\" (أستيقظ الساعة 7)، \"Faccio colazione\" (أتناول الإفطار)، \"Vado al lavoro\" (أذهب للعمل).',
    readingComprehension: 'La mia routine quotidiana è molto regolare. Mi sveglio alle 7 del mattino. Faccio colazione con caffè e pane. Vado al lavoro alle 8. Mangio il pranzo a mezzogiorno. Lavoro fino alle 5. Ceno con la famiglia alle 7. Vado a dormire alle 11. Questa è la mia giornata tipica.',
    readingComprehensionTranslation: 'روتيني اليومي منتظم جداً. أستيقظ الساعة 7 صباحاً. أتناول الإفطار مع القهوة والخبز. أذهب للعمل الساعة 8. أتناول الغداء في الظهيرة. أعمل حتى الساعة 5. أتناول العشاء مع العائلة الساعة 7. أنام الساعة 11. هذا هو يومي النموذجي.',
    quizQuestions: [
      { id: '1', type: 'multiple-choice', question: 'ما معنى \"Colazione\" بالعربية؟', options: ['العشاء', 'الإفطار', 'الغداء', 'الوجبة'], correctAnswer: 1 },
      { id: '2', type: 'true-false', question: 'Cena تعني الإفطار', correctAnswer: 0 },
      { id: '3', type: 'multiple-choice', question: 'ما معنى \"Svegliare\"؟', options: ['النوم', 'الاستيقاظ', 'الأكل', 'الذهاب'], correctAnswer: 1 },
    ],
  },
  {
    title: 'الطقس والاتجاهات',
    titleItalian: 'Il tempo e le direzioni',
    description: 'تعلم كيفية الحديث عن الطقس والاتجاهات',
    order: 5,
    vocabulary: [
      { word: 'Pioggia', translation: 'المطر', pronunciation: 'pioggia' },
      { word: 'Sole', translation: 'الشمس', pronunciation: 'sole' },
      { word: 'Nord', translation: 'الشمال', pronunciation: 'nord' },
      { word: 'Sud', translation: 'الجنوب', pronunciation: 'sud' },
      { word: 'Est', translation: 'الشرق', pronunciation: 'est' },
    ],
    grammar: 'للحديث عن الطقس: \"Fa caldo\" (الجو حار)، \"Fa freddo\" (الجو بارد)، \"Piove\" (يمطر)، \"C\'è il sole\" (الجو مشمس).',
    readingComprehension: 'Oggi fa molto caldo. C\'è il sole e non c\'è pioggia. Il vento viene da nord. Se vuoi andare a sud, devi girare a destra. A est c\'è il mare. A ovest c\'è la montagna. Il tempo è bellissimo oggi. Perfetto per una passeggiata!',
    readingComprehensionTranslation: 'اليوم الجو حار جداً. الجو مشمس ولا يوجد مطر. الريح تأتي من الشمال. إذا أردت أن تذهب جنوباً، يجب أن تنعطف يميناً. في الشرق البحر. في الغرب الجبل. الطقس جميل جداً اليوم. مثالي للمشي!',
    quizQuestions: [
      { id: '1', type: 'multiple-choice', question: 'ما معنى \"Pioggia\"؟', options: ['الشمس', 'المطر', 'الريح', 'الثلج'], correctAnswer: 1 },
      { id: '2', type: 'true-false', question: 'Nord تعني الجنوب', correctAnswer: 0 },
      { id: '3', type: 'multiple-choice', question: 'ما معنى \"Sole\"؟', options: ['القمر', 'النجم', 'الشمس', 'الضوء'], correctAnswer: 2 },
    ],
  },
  {
    title: 'الفصول والأشهر والأيام',
    titleItalian: 'Le stagioni, i mesi e i giorni',
    description: 'تعلم أسماء الفصول والأشهر والأيام',
    order: 6,
    vocabulary: [
      { word: 'Primavera', translation: 'الربيع', pronunciation: 'primavera' },
      { word: 'Estate', translation: 'الصيف', pronunciation: 'estate' },
      { word: 'Autunno', translation: 'الخريف', pronunciation: 'autunno' },
      { word: 'Inverno', translation: 'الشتاء', pronunciation: 'inverno' },
      { word: 'Gennaio', translation: 'يناير', pronunciation: 'gennaio' },
    ],
    grammar: 'أسماء الفصول: Primavera (الربيع)، Estate (الصيف)، Autunno (الخريف)، Inverno (الشتاء). أيام الأسبوع: lunedì، martedì، mercoledì، giovedì، venerdì، sabato، domenica.',
    readingComprehension: 'L\'anno ha quattro stagioni. La primavera è bella con i fiori. L\'estate è calda e soleggiata. L\'autunno è fresco e colorato. L\'inverno è freddo e nevoso. I mesi sono dodici: gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre. I giorni della settimana sono sette.',
    readingComprehensionTranslation: 'السنة لها أربعة فصول. الربيع جميل مع الزهور. الصيف حار ومشمس. الخريف بارد وملون. الشتاء بارد وثلجي. الأشهر اثنا عشر: يناير وفبراير ومارس وأبريل ومايو ويونيو ويوليو وأغسطس وسبتمبر وأكتوبر ونوفمبر وديسمبر. أيام الأسبوع سبعة.',
    quizQuestions: [
      { id: '1', type: 'multiple-choice', question: 'ما معنى \"Primavera\"؟', options: ['الصيف', 'الربيع', 'الخريف', 'الشتاء'], correctAnswer: 1 },
      { id: '2', type: 'true-false', question: 'Estate تعني الشتاء', correctAnswer: 0 },
      { id: '3', type: 'multiple-choice', question: 'كم عدد أيام الأسبوع؟', options: ['5', '6', '7', '8'], correctAnswer: 2 },
    ],
  },
  {
    title: 'الألوان',
    titleItalian: 'I colori',
    description: 'تعلم أسماء الألوان في اللغة الإيطالية',
    order: 7,
    vocabulary: [
      { word: 'Rosso', translation: 'أحمر', pronunciation: 'rosso' },
      { word: 'Blu', translation: 'أزرق', pronunciation: 'blu' },
      { word: 'Giallo', translation: 'أصفر', pronunciation: 'giallo' },
      { word: 'Verde', translation: 'أخضر', pronunciation: 'verde' },
      { word: 'Nero', translation: 'أسود', pronunciation: 'nero' },
    ],
    grammar: 'الألوان الأساسية: rosso (أحمر)، blu (أزرق)، giallo (أصفر)، verde (أخضر)، nero (أسود)، bianco (أبيض)، grigio (رمادي)، marrone (بني).',
    readingComprehension: 'I colori sono molto importanti nella vita. Il cielo è blu. L\'erba è verde. Il sole è giallo. Il fuoco è rosso. La notte è nera. La neve è bianca. Mi piacciono molti colori. Quale è il tuo colore preferito? Il mio colore preferito è il blu.',
    readingComprehensionTranslation: 'الألوان مهمة جداً في الحياة. السماء زرقاء. العشب أخضر. الشمس صفراء. النار حمراء. الليل أسود. الثلج أبيض. أحب الكثير من الألوان. ما لونك المفضل؟ لوني المفضل هو الأزرق.',
    quizQuestions: [
      { id: '1', type: 'multiple-choice', question: 'ما معنى \"Rosso\"؟', options: ['أزرق', 'أحمر', 'أصفر', 'أخضر'], correctAnswer: 1 },
      { id: '2', type: 'true-false', question: 'Verde تعني أسود', correctAnswer: 0 },
      { id: '3', type: 'multiple-choice', question: 'ما معنى \"Bianco\"؟', options: ['أسود', 'أبيض', 'رمادي', 'بني'], correctAnswer: 1 },
    ],
  },
  {
    title: 'الموضة والملابس',
    titleItalian: 'La moda e i vestiti',
    description: 'تعلم أسماء الملابس والحديث عن الموضة',
    order: 8,
    vocabulary: [
      { word: 'Vestito', translation: 'فستان', pronunciation: 'vestito' },
      { word: 'Camicia', translation: 'قميص', pronunciation: 'camicia' },
      { word: 'Pantaloni', translation: 'بنطال', pronunciation: 'pantaloni' },
      { word: 'Scarpe', translation: 'أحذية', pronunciation: 'scarpe' },
      { word: 'Cappello', translation: 'قبعة', pronunciation: 'cappello' },
    ],
    grammar: 'أسماء الملابس: vestito (فستان)، camicia (قميص)، pantaloni (بنطال)، scarpe (أحذية)، cappello (قبعة)، giacca (سترة)، cravatta (ربطة عنق).',
    readingComprehension: 'La moda è importante per molte persone. Indosso un vestito rosso oggi. La mia camicia è bianca. I miei pantaloni sono blu. Le mie scarpe sono nere. Indosso un cappello per proteggermi dal sole. Mi piace la moda italiana. Gli stilisti italiani sono famosi in tutto il mondo.',
    readingComprehensionTranslation: 'الموضة مهمة لكثير من الناس. أرتدي فستاناً أحمر اليوم. قميصي أبيض. بنطالي أزرق. أحذيتي سوداء. أرتدي قبعة لحماية نفسي من الشمس. أحب الموضة الإيطالية. مصممو الأزياء الإيطاليون مشهورون في جميع أنحاء العالم.',
    quizQuestions: [
      { id: '1', type: 'multiple-choice', question: 'ما معنى \"Vestito\"؟', options: ['قميص', 'فستان', 'بنطال', 'حذاء'], correctAnswer: 1 },
      { id: '2', type: 'true-false', question: 'Scarpe تعني قبعة', correctAnswer: 0 },
      { id: '3', type: 'multiple-choice', question: 'ما معنى \"Cappello\"؟', options: ['سترة', 'ربطة عنق', 'قبعة', 'حزام'], correctAnswer: 2 },
    ],
  },
  {
    title: 'التسوق للملابس',
    titleItalian: 'Fare shopping di vestiti',
    description: 'تعلم كيفية التسوق للملابس والحديث عن الأسعار',
    order: 9,
    vocabulary: [
      { word: 'Negozio', translation: 'متجر', pronunciation: 'negozio' },
      { word: 'Prezzo', translation: 'السعر', pronunciation: 'prezzo' },
      { word: 'Caro', translation: 'غالي', pronunciation: 'caro' },
      { word: 'Economico', translation: 'رخيص', pronunciation: 'economico' },
      { word: 'Sconto', translation: 'خصم', pronunciation: 'sconto' },
    ],
    grammar: 'للتسوق: \"Quanto costa?\" (كم السعر؟)، \"È troppo caro\" (إنه غالي جداً)، \"C\'è uno sconto?\" (هل هناك خصم؟)، \"Vorrei provare\" (أود أن أجرب).',
    readingComprehension: 'Vado al negozio di vestiti. Cerco un vestito nuovo. Il commesso mi aiuta. Chiedo il prezzo. Il vestito costa cento euro. È un po\' caro. Chiedo se c\'è uno sconto. Il commesso mi dice che c\'è uno sconto del venti per cento. Decido di comprare il vestito. Pago con la carta di credito.',
    readingComprehensionTranslation: 'أذهب إلى متجر الملابس. أبحث عن فستان جديد. يساعدني الموظف. أسأل عن السعر. الفستان يكلف مائة يورو. إنه غالي قليلاً. أسأل إذا كان هناك خصم. يخبرني الموظف أن هناك خصماً بنسبة عشرين بالمائة. أقرر شراء الفستان. أدفع ببطاقة الائتمان.',
    quizQuestions: [
      { id: '1', type: 'multiple-choice', question: 'ما معنى \"Negozio\"؟', options: ['منزل', 'متجر', 'مدرسة', 'مكتب'], correctAnswer: 1 },
      { id: '2', type: 'true-false', question: 'Caro تعني رخيص', correctAnswer: 0 },
      { id: '3', type: 'multiple-choice', question: 'ما معنى \"Sconto\"؟', options: ['سعر', 'خصم', 'فاتورة', 'دفع'], correctAnswer: 1 },
    ],
  },
  {
    title: 'التسوق للبقالة',
    titleItalian: 'Fare shopping di generi alimentari',
    description: 'تعلم كيفية التسوق للبقالة والحديث عن الطعام',
    order: 10,
    vocabulary: [
      { word: 'Pane', translation: 'خبز', pronunciation: 'pane' },
      { word: 'Latte', translation: 'حليب', pronunciation: 'latte' },
      { word: 'Formaggio', translation: 'جبن', pronunciation: 'formaggio' },
      { word: 'Mela', translation: 'تفاحة', pronunciation: 'mela' },
      { word: 'Pomodoro', translation: 'طماطم', pronunciation: 'pomodoro' },
    ],
    grammar: 'للتسوق في البقالة: \"Vorrei...\" (أود...)، \"Quanto costa?\" (كم السعر؟)، \"Un chilo di...\" (كيلو من...)، \"Mezzo litro di...\" (نصف لتر من...).',
    readingComprehension: 'Vado al supermercato. Compro pane, latte, formaggio, mele e pomodori. Il pane costa due euro. Il latte costa uno euro e cinquanta. Il formaggio costa cinque euro. Le mele costano tre euro al chilo. I pomodori costano due euro al chilo. Pago alla cassa. Il totale è venti euro.',
    readingComprehensionTranslation: 'أذهب إلى السوبرماركت. أشتري خبزاً وحليباً وجبناً وتفاحاً وطماطم. الخبز يكلف يورويين. الحليب يكلف يورو واحد وخمسين. الجبن يكلف خمسة يورو. التفاح يكلف ثلاثة يورو للكيلو. الطماطم تكلف يورويين للكيلو. أدفع في الكاشير. المجموع عشرون يورو.',
    quizQuestions: [
      { id: '1', type: 'multiple-choice', question: 'ما معنى \"Pane\"؟', options: ['حليب', 'خبز', 'جبن', 'لحم'], correctAnswer: 1 },
      { id: '2', type: 'true-false', question: 'Latte تعني جبن', correctAnswer: 0 },
      { id: '3', type: 'multiple-choice', question: 'ما معنى \"Pomodoro\"؟', options: ['بطاطس', 'طماطم', 'خيار', 'بصل'], correctAnswer: 1 },
    ],
  },
];

async function seedLessons() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'italina',
  });

  try {
    for (const lesson of lessonsData) {
      await connection.execute(
        `INSERT INTO lessons (title, titleItalian, description, level, \`order\`, vocabulary, grammar, readingComprehension, readingComprehensionTranslation, quizQuestions, isPublished)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          lesson.title,
          lesson.titleItalian,
          lesson.description,
          'A1',
          lesson.order,
          JSON.stringify(lesson.vocabulary),
          lesson.grammar,
          lesson.readingComprehension,
          lesson.readingComprehensionTranslation,
          JSON.stringify(lesson.quizQuestions),
          true,
        ]
      );
    }
    console.log(`✅ ${lessonsData.length} lessons seeded successfully!`);
  } catch (error) {
    console.error('❌ Error seeding lessons:', error);
  } finally {
    await connection.end();
  }
}

seedLessons();
