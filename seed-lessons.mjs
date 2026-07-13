import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Sample A1 lessons
const a1Lessons = [
  {
    title: 'مقدمة إلى اللغة الإيطالية',
    titleItalian: 'Introduzione all\'Italiano',
    level: 'A1',
    registerLevel: 'neutro',
    description: 'تعلم الأساسيات: الأبجدية، الأرقام، والتحيات الأساسية',
    vocabulary: JSON.stringify([
      { italian: 'Ciao', arabic: 'مرحبا', example: 'Ciao, come stai?' },
      { italian: 'Grazie', arabic: 'شكراً', example: 'Grazie mille!' },
      { italian: 'Piacere', arabic: 'يسعدني', example: 'Piacere di conoscerti' },
    ]),
    grammar: 'الضمائر الشخصية: Io, Tu, Lui/Lei, Noi, Voi, Loro\nفعل "essere" (أن يكون): sono, sei, è, siamo, siete, sono',
    readingComprehension: 'Mi chiamo Marco. Sono italiano. Vivo a Roma. Mi piace imparare le lingue.',
    quizQuestions: JSON.stringify([
      { question: 'Come si dice "مرحبا" in italiano?', options: ['Ciao', 'Grazie', 'Piacere'], correct: 0 },
      { question: 'Cosa significa "Grazie"?', options: ['مرحبا', 'شكراً', 'يسعدني'], correct: 1 },
    ]),
    isPublished: true,
  },
  {
    title: 'الأسرة والعلاقات',
    titleItalian: 'La Famiglia',
    level: 'A1',
    registerLevel: 'neutro',
    description: 'تعلم كلمات الأسرة والعلاقات الشخصية',
    vocabulary: JSON.stringify([
      { italian: 'Padre', arabic: 'أب', example: 'Mio padre è ingegnere' },
      { italian: 'Madre', arabic: 'أم', example: 'Mia madre è insegnante' },
      { italian: 'Fratello', arabic: 'أخ', example: 'Ho un fratello' },
    ]),
    grammar: 'الملكية: mio, mia, tuo, tua, suo, sua, nostro, nostra, vostro, vostra',
    readingComprehension: 'Ho una famiglia grande. Mio padre si chiama Giuseppe. Mia madre si chiama Maria. Ho due fratelli.',
    quizQuestions: JSON.stringify([
      { question: 'Cosa significa "Padre"?', options: ['أم', 'أب', 'أخ'], correct: 1 },
    ]),
    isPublished: true,
  },
  {
    title: 'الطعام والشراب',
    titleItalian: 'Il Cibo e le Bevande',
    level: 'A1',
    registerLevel: 'neutro',
    description: 'تعلم أسماء الأطعمة والمشروبات الشائعة',
    vocabulary: JSON.stringify([
      { italian: 'Pane', arabic: 'خبز', example: 'Voglio un pezzo di pane' },
      { italian: 'Acqua', arabic: 'ماء', example: 'Un bicchiere di acqua, per favore' },
      { italian: 'Pizza', arabic: 'بيتزا', example: 'Mi piace la pizza italiana' },
    ]),
    grammar: 'الأفعال: volere (أريد), potere (أستطيع), dovere (يجب)',
    readingComprehension: 'Mi piace mangiare la pizza. Bevo caffè ogni mattina. La pasta è deliciosa.',
    quizQuestions: JSON.stringify([
      { question: 'Cosa significa "Pizza"?', options: ['خبز', 'ماء', 'بيتزا'], correct: 2 },
    ]),
    isPublished: true,
  },
];

// Sample B1 lessons
const b1Lessons = [
  {
    title: 'الماضي البسيط',
    titleItalian: 'Il Passato Prossimo',
    level: 'B1',
    registerLevel: 'formale',
    description: 'تعلم صيغة الماضي البسيط والقريب',
    vocabulary: JSON.stringify([
      { italian: 'Andare', arabic: 'ذهب', example: 'Sono andato al cinema' },
      { italian: 'Mangiare', arabic: 'أكل', example: 'Ho mangiato una pizza' },
      { italian: 'Vedere', arabic: 'رأى', example: 'Ho visto un film interessante' },
    ]),
    grammar: 'Passato Prossimo: ho/hai/ha + participio passato\nEsempi: ho mangiato, hai visto, ha parlato',
    readingComprehension: 'Ieri sono andato al ristorante con i miei amici. Abbiamo mangiato una cena deliziosa. Dopo, siamo andati al cinema.',
    quizQuestions: JSON.stringify([
      { question: 'Come si forma il passato prossimo?', options: ['sono + participio', 'ho + participio', 'entrambi'], correct: 2 },
    ]),
    isPublished: true,
  },
  {
    title: 'الأدب الإيطالي الكلاسيكي',
    titleItalian: 'La Letteratura Italiana Classica',
    level: 'B1',
    registerLevel: 'letterario',
    description: 'مقدمة إلى الأدب الإيطالي الكلاسيكي',
    vocabulary: JSON.stringify([
      { italian: 'Poeta', arabic: 'شاعر', example: 'Dante è un grande poeta' },
      { italian: 'Verso', arabic: 'بيت شعر', example: 'Questo verso è bellissimo' },
      { italian: 'Rima', arabic: 'قافية', example: 'La rima è importante nella poesia' },
    ]),
    grammar: 'Congiuntivo presente: che io parli, che tu parli, che lui parli',
    readingComprehension: 'Nel Medioevo, la letteratura italiana era ricca di poesia. Dante Alighieri scrisse la Divina Commedia, uno dei capolavori della letteratura mondiale.',
    quizQuestions: JSON.stringify([
      { question: 'Chi scrisse la Divina Commedia?', options: ['Petrarca', 'Dante', 'Boccaccio'], correct: 1 },
    ]),
    isPublished: true,
  },
];

// Sample C1 lessons
const c1Lessons = [
  {
    title: 'الأدب الحديث والمعاصر',
    titleItalian: 'La Letteratura Moderna e Contemporanea',
    level: 'C1',
    registerLevel: 'letterario',
    description: 'استكشاف الأدب الإيطالي الحديث والمعاصر',
    vocabulary: JSON.stringify([
      { italian: 'Narratore', arabic: 'الراوي', example: 'Il narratore descrive la scena con dettagli' },
      { italian: 'Metafora', arabic: 'استعارة', example: 'La vita è un viaggio' },
      { italian: 'Simbolismo', arabic: 'الرمزية', example: 'Il simbolismo è importante nell\'arte moderna' },
    ]),
    grammar: 'Congiuntivo imperfetto: che io parlassi, che tu parlassi, che lui parlasse',
    readingComprehension: 'Gli scrittori moderni italiani hanno portato innovazione nella letteratura. Italo Calvino, con le sue "Città invisibili", ha creato un\'opera di grande fantasia e profondità filosofica.',
    quizQuestions: JSON.stringify([
      { question: 'Chi ha scritto "Città invisibili"?', options: ['Calvino', 'Moravia', 'Pasolini'], correct: 0 },
    ]),
    isPublished: true,
  },
];

async function seedLessons() {
  try {
    const allLessons = [...a1Lessons, ...b1Lessons, ...c1Lessons];

    for (const lesson of allLessons) {
      await connection.execute(
        `INSERT INTO lessons (title, titleItalian, level, registerLevel, description, vocabulary, grammar, readingComprehension, quizQuestions, isPublished, \`order\`, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          lesson.title,
          lesson.titleItalian,
          lesson.level,
          lesson.registerLevel,
          lesson.description,
          lesson.vocabulary,
          lesson.grammar,
          lesson.readingComprehension,
          lesson.quizQuestions,
          lesson.isPublished ? 1 : 0,
          Math.floor(Math.random() * 1000),
        ]
      );
    }

    console.log(`✅ Successfully seeded ${allLessons.length} lessons`);
  } catch (error) {
    console.error('❌ Error seeding lessons:', error);
  } finally {
    await connection.end();
  }
}

seedLessons();
