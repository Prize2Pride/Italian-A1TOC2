import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Lesson topics for each level
const LESSON_TOPICS = {
  A1: [
    'Greetings and Introductions', 'Numbers and Counting', 'Days of the Week', 'Months and Seasons',
    'Family Members', 'Basic Food and Drinks', 'Colors', 'Animals', 'Body Parts', 'Clothing',
    'House and Rooms', 'School Subjects', 'Sports and Games', 'Weather', 'Time and Clocks',
    'Simple Commands', 'Asking for Help', 'Polite Expressions', 'Favorite Things', 'Daily Routine',
    'Breakfast Foods', 'Lunch and Dinner', 'Fruits and Vegetables', 'Drinks', 'Desserts',
    'Morning Activities', 'Evening Activities', 'Weekend Plans', 'School Day', 'Bedtime',
    'Toys and Games', 'Pets', 'Nature', 'Flowers', 'Trees', 'Insects', 'Birds', 'Fish',
    'Transportation', 'Vehicles', 'Streets', 'Shops', 'Markets', 'Money', 'Prices',
    'Emotions', 'Feelings', 'Happy', 'Sad', 'Angry', 'Tired', 'Hungry', 'Thirsty',
    'Directions', 'Left and Right', 'Up and Down', 'In and Out', 'Near and Far',
  ],
  A2: [
    'Past Tense Basics', 'Shopping at Markets', 'Restaurant Dining', 'Travel Planning',
    'Hotel Reservations', 'Asking Directions', 'Public Transportation', 'Telephone Conversations',
    'Describing People', 'Describing Places', 'Weather Descriptions', 'Seasonal Activities',
    'Hobbies and Interests', 'Music and Instruments', 'Movies and Entertainment', 'Reading and Books',
    'School Life', 'Classroom Activities', 'Homework and Studying', 'Friends and Friendship',
    'Family Relationships', 'Home Chores', 'Cooking and Recipes', 'Eating Habits',
    'Health and Fitness', 'Doctor Visits', 'Medicines', 'Exercise and Sports',
    'Clothing and Fashion', 'Seasons and Weather', 'Holidays and Celebrations', 'Birthday Parties',
    'Gifts and Presents', 'Travel Experiences', 'Vacation Plans', 'Beach and Mountains',
    'City Life', 'Country Life', 'Villages', 'Farms', 'Animals on Farms',
    'Technology and Computers', 'Television and Radio', 'Phones and Texting', 'Internet',
    'Social Media', 'School Subjects', 'Career Interests', 'Future Plans',
  ],
  B1: [
    'Subjunctive Mood Introduction', 'Complex Sentences', 'Conditional Statements', 'Reported Speech',
    'Advanced Grammar', 'Literature Basics', 'Poetry Introduction', 'Storytelling',
    'Debate and Discussion', 'Expressing Opinions', 'Agreeing and Disagreeing', 'Persuasion',
    'Cultural Traditions', 'Historical Events', 'Geography of Italy', 'Italian Cities',
    'Regional Differences', 'Local Customs', 'Festivals and Celebrations', 'Religious Holidays',
    'Art and Painting', 'Sculpture and Architecture', 'Music History', 'Famous Composers',
    'Opera and Theater', 'Cinema and Film', 'Literature Classics', 'Famous Authors',
    'Cooking Techniques', 'Regional Cuisine', 'Wine and Beverages', 'Food Culture',
    'Restaurant Etiquette', 'Ordering Meals', 'Dietary Preferences', 'Allergies',
    'Travel Logistics', 'Booking Accommodations', 'Tourist Attractions', 'Museums',
    'Historical Sites', 'Nature Reserves', 'Adventure Activities', 'Safety While Traveling',
    'Business Communication', 'Professional Meetings', 'Workplace Culture', 'Job Interviews',
    'Career Development', 'Education Paths', 'University Life', 'Student Exchange',
  ],
  B2: [
    'Advanced Subjunctive', 'Nuanced Expressions', 'Idiomatic Phrases', 'Colloquial Language',
    'Literary Analysis', 'Poetry Interpretation', 'Novel Discussion', 'Critical Thinking',
    'Philosophical Concepts', 'Ethical Discussions', 'Social Issues', 'Environmental Topics',
    'Political Systems', 'Government Structure', 'Democracy and Rights', 'International Relations',
    'Economic Concepts', 'Business and Trade', 'Financial Planning', 'Investment Basics',
    'Technology Trends', 'Digital Innovation', 'Cybersecurity', 'Artificial Intelligence',
    'Scientific Discoveries', 'Medical Advances', 'Health and Wellness', 'Nutrition Science',
    'Psychology Basics', 'Human Behavior', 'Relationships and Communication', 'Conflict Resolution',
    'Art Movements', 'Renaissance Period', 'Baroque Era', 'Modern Art',
    'Italian Cinema', 'Film Directors', 'Cinematography', 'Movie Genres',
    'Music Theory', 'Musical Composition', 'Performance Arts', 'Dance',
    'Culinary Arts', 'Chef Profiles', 'Michelin Restaurants', 'Food Innovation',
    'Wine Tasting', 'Viticulture', 'Wine Regions', 'Sommelier Knowledge',
    'Travel Writing', 'Cultural Immersion', 'Anthropology', 'Ethnography',
  ],
  C1: [
    'Advanced Literary Techniques', 'Stylistic Variations', 'Register Mastery', 'Formal Writing',
    'Academic Writing', 'Research Papers', 'Thesis Development', 'Critical Analysis',
    'Philosophical Discourse', 'Existentialism', 'Phenomenology', 'Metaphysics',
    'Political Philosophy', 'Social Contract Theory', 'Justice and Equality', 'Human Rights',
    'Economics Theory', 'Macroeconomics', 'Microeconomics', 'Market Analysis',
    'Financial Markets', 'Stock Exchange', 'Cryptocurrency', 'Blockchain Technology',
    'Quantum Physics', 'Relativity Theory', 'Particle Physics', 'Cosmology',
    'Neuroscience', 'Brain Function', 'Consciousness Studies', 'Cognitive Science',
    'Genetic Engineering', 'Biotechnology', 'Molecular Biology', 'DNA Research',
    'Climate Change', 'Environmental Policy', 'Sustainability', 'Green Energy',
    'Geopolitics', 'International Law', 'Diplomacy', 'Conflict Studies',
    'Comparative Literature', 'World Cinema', 'Cultural Studies', 'Postmodernism',
    'Contemporary Art', 'Installation Art', 'Digital Art', 'Performance Art',
    'Avant-Garde Music', 'Experimental Composition', 'Electronic Music', 'Sound Design',
    'Gastronomy Science', 'Food Chemistry', 'Molecular Gastronomy', 'Culinary Innovation',
    'Wine Science', 'Terroir Concept', 'Fermentation Process', 'Wine Aging',
  ],
  C2: [
    'Mastery of All Registers', 'Regional Dialects', 'Dialectal Variations', 'Sociolinguistics',
    'Historical Linguistics', 'Etymology and Origins', 'Language Evolution', 'Linguistic Theory',
    'Semiotics and Symbolism', 'Literary Criticism', 'Deconstruction', 'Hermeneutics',
    'Phenomenological Analysis', 'Ontological Questions', 'Epistemology', 'Metaphysical Inquiry',
    'Political Theory', 'Revolutionary Thought', 'Anarchism and Socialism', 'Liberalism and Conservatism',
    'Constitutional Law', 'International Treaties', 'Human Rights Law', 'Criminal Justice',
    'Advanced Economics', 'Econometrics', 'Game Theory', 'Behavioral Economics',
    'Quantum Mechanics', 'String Theory', 'Astrophysics', 'Black Holes and Singularities',
    'Synthetic Biology', 'CRISPR Technology', 'Gene Therapy', 'Personalized Medicine',
    'Climate Modeling', 'Renewable Energy Systems', 'Carbon Sequestration', 'Circular Economy',
    'Geopolitical Strategy', 'Power Dynamics', 'Soft Power', 'Cultural Diplomacy',
    'Postcolonial Theory', 'Decolonization', 'Subaltern Studies', 'Identity Politics',
    'Hypermodernity', 'Digital Culture', 'Virtual Reality', 'Metaverse Studies',
    'Culinary Philosophy', 'Food Ethics', 'Agricultural Science', 'Sustainable Farming',
    'Wine Connoisseurship', 'Rare Vintages', 'Auction House Expertise', 'Wine Investment',
    'Italian Renaissance', 'Dante and Petrarch', 'Machiavelli', 'Modern Italian Thought',
  ],
};

// Registers
const REGISTERS = [
  'sporchissimo',
  'sporco',
  'informale',
  'neutro',
  'formale',
  'diplomatico',
  'diplomatico_elevato',
];

// Quiz question templates
const QUIZ_TEMPLATES = [
  { question: 'What is the main topic of this lesson?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 0 },
  { question: 'Which vocabulary word means...?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 1 },
  { question: 'How would you say this in Italian?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 2 },
  { question: 'What is the correct grammar rule here?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 3 },
  { question: 'Which sentence is correct?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 0 },
];

// Generate a lesson object
function generateLesson(topic, level, register, order) {
  const vocabulary = [
    { italian: 'parola1', arabic: 'كلمة 1', example: 'Questo è un esempio.' },
    { italian: 'parola2', arabic: 'كلمة 2', example: 'Un altro esempio qui.' },
    { italian: 'parola3', arabic: 'كلمة 3', example: 'Terzo esempio.' },
    { italian: 'parola4', arabic: 'كلمة 4', example: 'Quarto esempio.' },
    { italian: 'parola5', arabic: 'كلمة 5', example: 'Quinto esempio.' },
  ];

  const grammar = `Grammar explanation for ${topic} at level ${level} in ${register} register. This covers the fundamental concepts and usage patterns.`;
  const readingComprehension = `This is a reading passage about ${topic}. It demonstrates the vocabulary and grammar concepts taught in this lesson. Students should be able to understand the main ideas and answer comprehension questions about the content.`;
  const readingComprehensionTranslation = `هذا نص قراءة عن ${topic}. يوضح مفاهيم المفردات والقواعد المدرسة في هذا الدرس.`;

  const quizQuestions = QUIZ_TEMPLATES.map((template, idx) => ({
    question: `${template.question} (${topic})`,
    options: template.options,
    correct: template.correct,
  }));

  return {
    title: `Lesson: ${topic}`,
    titleItalian: `Lezione: ${topic}`,
    level,
    registerLevel: register,
    description: `A comprehensive lesson about ${topic} at CEFR level ${level} in ${register} register.`,
    vocabulary: JSON.stringify(vocabulary),
    grammar,
    readingComprehension,
    readingComprehensionTranslation,
    quizQuestions: JSON.stringify(quizQuestions),
    registerLevel: register,
    isPublished: true,
    order,
  };
}

async function seedLessons() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  let totalSeeded = 0;
  let order = 1;

  try {
    for (const [level, topics] of Object.entries(LESSON_TOPICS)) {
      console.log(`\n📚 Seeding ${level} lessons (${topics.length} topics)...`);

      for (const topic of topics) {
        // Generate one lesson per register for each topic
        for (const register of REGISTERS) {
          const lesson = generateLesson(topic, level, register, order);

          const query = `
            INSERT INTO lessons (
              title, titleItalian, level, registerLevel, description,
              vocabulary, grammar, readingComprehension, readingComprehensionTranslation,
              quizQuestions, isPublished, \`order\`
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
            lesson.title,
            lesson.titleItalian,
            lesson.level,
            lesson.registerLevel,
            lesson.description,
            lesson.vocabulary,
            lesson.grammar,
            lesson.readingComprehension,
            lesson.readingComprehensionTranslation,
            lesson.quizQuestions,
            lesson.isPublished,
            order,
          ];

          try {
            await connection.execute(query, values);
            totalSeeded++;
            order++;

            if (totalSeeded % 50 === 0) {
              console.log(`  ✓ Seeded ${totalSeeded} lessons...`);
            }
          } catch (error) {
            console.error(`Error seeding lesson for ${topic} (${register}):`, error.message);
          }
        }
      }
    }

    console.log(`\n✅ Successfully seeded ${totalSeeded} Italian lessons!`);
    console.log(`   - A1: ${LESSON_TOPICS.A1.length * REGISTERS.length} lessons`);
    console.log(`   - A2: ${LESSON_TOPICS.A2.length * REGISTERS.length} lessons`);
    console.log(`   - B1: ${LESSON_TOPICS.B1.length * REGISTERS.length} lessons`);
    console.log(`   - B2: ${LESSON_TOPICS.B2.length * REGISTERS.length} lessons`);
    console.log(`   - C1: ${LESSON_TOPICS.C1.length * REGISTERS.length} lessons`);
    console.log(`   - C2: ${LESSON_TOPICS.C2.length * REGISTERS.length} lessons`);
    console.log(`   - Total: ${totalSeeded} lessons across 7 registers`);
  } catch (error) {
    console.error('Fatal error:', error);
  } finally {
    await connection.end();
  }
}

// Run the seeding
seedLessons();
