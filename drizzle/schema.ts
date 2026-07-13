import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Lessons table - stores all Italian A1-C2 course lessons
 */
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  
  // Lesson metadata
  title: varchar("title", { length: 255 }).notNull(), // e.g., "الأبجدية والنطق"
  titleItalian: varchar("titleItalian", { length: 255 }).notNull(), // e.g., "L'alfabeto e la pronuncia"
  description: text("description"), // Short description in Arabic
  level: varchar("level", { length: 10 }).default("A1").notNull(), // A1, A2, B1, etc.
  order: int("order").notNull(), // Display order
  
  // Content
  vocabulary: json("vocabulary").notNull(), // Array of {word, translation, pronunciation}
  grammar: text("grammar"), // Grammar explanation in Arabic
  readingComprehension: text("readingComprehension"), // 20+ sentence Italian text
  readingComprehensionTranslation: text("readingComprehensionTranslation"), // Arabic translation
  
  // Quiz questions
  quizQuestions: json("quizQuestions").notNull(), // Array of quiz objects
  
  // Register level (7 levels: sporchissimo, sporco, informale, neutro, formale, diplomatico, diplomatico_elevato)
  registerLevel: varchar("registerLevel", { length: 50 }).default("neutro"),
  
  // All 7 registers for this lesson (JSON array with translations in each register)
  registerVariations: json("registerVariations").default(JSON.stringify({})), // {sporchissimo: {...}, sporco: {...}, etc}
  
  // Metadata
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

/**
 * User progress table - tracks user progress through lessons
 */
export const userProgress = mysqlTable("userProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users table
  lessonId: int("lessonId").notNull(), // Foreign key to lessons table
  
  // Progress tracking
  isCompleted: boolean("isCompleted").default(false),
  quizScore: int("quizScore"), // Percentage score
  timeSpent: int("timeSpent"), // Time spent in seconds
  
  // Metadata
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

/**
 * Chat history table - stores professor chat conversations
 */
export const chatHistory = mysqlTable("chatHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users table
  
  // Message content
  userMessage: text("userMessage").notNull(),
  assistantMessage: text("assistantMessage").notNull(),
  
  // Style and context
  italianStyle: varchar("italianStyle", { length: 50 }).default("informal").notNull(),
  topic: varchar("topic", { length: 255 }), // Optional: what topic was discussed
  
  // Metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatHistory = typeof chatHistory.$inferSelect;
export type InsertChatHistory = typeof chatHistory.$inferInsert;

/**
 * Culture modules table - stores Italian culture content (art, music, cuisine, history, dialects)
 */
export const cultureModules = mysqlTable("cultureModules", {
  id: int("id").autoincrement().primaryKey(),
  
  // Module metadata
  title: varchar("title", { length: 255 }).notNull(), // e.g., "Italian Renaissance Art"
  titleArabic: varchar("titleArabic", { length: 255 }).notNull(),
  description: text("description"), // Detailed description
  category: mysqlEnum("category", ["art", "music", "cuisine", "history", "dialects"]).notNull(),
  level: varchar("level", { length: 10 }).default("A1").notNull(), // CEFR level
  
  // Content
  content: text("content").notNull(), // Main content in Italian
  contentArabic: text("contentArabic"), // Arabic translation
  keyPoints: json("keyPoints"), // Array of key learning points
  
  // Media and references
  imageUrl: varchar("imageUrl", { length: 512 }),
  videoUrl: varchar("videoUrl", { length: 512 }),
  references: json("references"), // Array of reference links/books
  
  // Metadata
  order: int("order").notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CultureModule = typeof cultureModules.$inferSelect;
export type InsertCultureModule = typeof cultureModules.$inferInsert;

/**
 * Literature timeline table - stores Italian literature history and key works
 */
export const literatureTimeline = mysqlTable("literatureTimeline", {
  id: int("id").autoincrement().primaryKey(),
  
  // Timeline metadata
  period: varchar("period", { length: 255 }).notNull(), // e.g., "Medieval (1200-1400)"
  startYear: int("startYear"),
  endYear: int("endYear"),
  
  // Content
  title: varchar("title", { length: 255 }).notNull(), // e.g., "Dante Alighieri"
  titleArabic: varchar("titleArabic", { length: 255 }),
  description: text("description").notNull(), // Biography/context
  descriptionArabic: text("descriptionArabic"),
  
  // Key works
  keyWorks: json("keyWorks"), // Array of {title, year, excerpt, level}
  
  // CEFR level for this content
  level: varchar("level", { length: 10 }).default("B1").notNull(),
  
  // Media
  imageUrl: varchar("imageUrl", { length: 512 }),
  
  // Metadata
  order: int("order").notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LiteratureTimeline = typeof literatureTimeline.$inferSelect;
export type InsertLiteratureTimeline = typeof literatureTimeline.$inferInsert;

/**
 * Pronunciation guides table - stores IPA, phonetic breakdowns, and audio references
 */
export const pronunciationGuides = mysqlTable("pronunciationGuides", {
  id: int("id").autoincrement().primaryKey(),
  
  // Word/phrase metadata
  word: varchar("word", { length: 255 }).notNull(),
  translation: varchar("translation", { length: 255 }),
  
  // Pronunciation data
  ipa: varchar("ipa", { length: 255 }).notNull(), // International Phonetic Alphabet
  phoneticBreakdown: text("phoneticBreakdown"), // Syllable-by-syllable breakdown
  audioUrl: varchar("audioUrl", { length: 512 }), // URL to audio file
  
  // Context
  lessonId: int("lessonId"), // Optional: linked lesson
  registerLevel: varchar("registerLevel", { length: 50 }).default("neutro"),
  
  // Metadata
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PronunciationGuide = typeof pronunciationGuides.$inferSelect;
export type InsertPronunciationGuide = typeof pronunciationGuides.$inferInsert;

/**
 * User preferences table - stores individual learning preferences
 */
export const userPreferences = mysqlTable("userPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(), // Foreign key to users table
  
  // Learning preferences
  preferredRegister: varchar("preferredRegister", { length: 50 }).default("neutro"),
  learningPace: varchar("learningPace", { length: 50 }).default("moderate"), // slow, moderate, fast
  enableTTS: boolean("enableTTS").default(true),
  ttsSpeed: int("ttsSpeed").default(100), // Percentage (50-200)
  
  // Metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;