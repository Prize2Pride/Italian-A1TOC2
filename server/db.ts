import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, lessons, userProgress, chatHistory, cultureModules, literatureTimeline, pronunciationGuides, userPreferences } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ LESSONS QUERIES ============

export async function getLessonsByLevel(level: string) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(lessons).where(
    and(eq(lessons.level, level), eq(lessons.isPublished, true))
  ).orderBy(lessons.order);
}

export async function getAllLessons() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(lessons).where(eq(lessons.isPublished, true)).orderBy(lessons.order);
}

export async function getLessonById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(lessons).where(eq(lessons.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createLesson(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(lessons).values(data);
  return result;
}

// ============ USER PROGRESS QUERIES ============

export async function getUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(userProgress).where(eq(userProgress.userId, userId));
}

export async function getLessonProgress(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(userProgress).where(
    and(eq(userProgress.userId, userId), eq(userProgress.lessonId, lessonId))
  ).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateLessonProgress(userId: number, lessonId: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getLessonProgress(userId, lessonId);

  if (existing) {
    return db.update(userProgress).set(data).where(
      and(eq(userProgress.userId, userId), eq(userProgress.lessonId, lessonId))
    );
  } else {
    return db.insert(userProgress).values({
      userId,
      lessonId,
      ...data,
    });
  }
}

// ============ CHAT HISTORY QUERIES ============

export async function getChatHistory(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(chatHistory).where(eq(chatHistory.userId, userId)).orderBy(chatHistory.createdAt).limit(limit);
}

export async function saveChatMessage(userId: number, userMessage: string, assistantMessage: string, italianStyle: string = "informal", topic?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(chatHistory).values({
    userId,
    userMessage,
    assistantMessage,
    italianStyle,
    topic,
  });
}

// ============ CULTURE MODULES QUERIES ============

export async function getCultureModulesByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(cultureModules).where(
    and(eq(cultureModules.category, category as any), eq(cultureModules.isPublished, true))
  ).orderBy(cultureModules.order);
}

export async function getCultureModulesByLevel(level: string) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(cultureModules).where(
    and(eq(cultureModules.level, level), eq(cultureModules.isPublished, true))
  ).orderBy(cultureModules.order);
}

export async function getAllCultureModules() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(cultureModules).where(eq(cultureModules.isPublished, true)).orderBy(cultureModules.order);
}

export async function getCultureModuleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(cultureModules).where(eq(cultureModules.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ LITERATURE TIMELINE QUERIES ============

export async function getLiteratureTimelineByLevel(level: string) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(literatureTimeline).where(
    and(eq(literatureTimeline.level, level), eq(literatureTimeline.isPublished, true))
  ).orderBy(literatureTimeline.startYear);
}

export async function getAllLiteratureTimeline() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(literatureTimeline).where(eq(literatureTimeline.isPublished, true)).orderBy(literatureTimeline.startYear);
}

export async function getLiteratureTimelineById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(literatureTimeline).where(eq(literatureTimeline.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ PRONUNCIATION GUIDES QUERIES ============

export async function getPronunciationGuidesByLesson(lessonId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(pronunciationGuides).where(
    and(eq(pronunciationGuides.lessonId, lessonId), eq(pronunciationGuides.isPublished, true))
  );
}

export async function getPronunciationGuideByWord(word: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(pronunciationGuides).where(eq(pronunciationGuides.word, word)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllPronunciationGuides() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(pronunciationGuides).where(eq(pronunciationGuides.isPublished, true));
}

// ============ USER PREFERENCES QUERIES ============

export async function getUserPreferences(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserPreferences(userId: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getUserPreferences(userId);

  if (existing) {
    return db.update(userPreferences).set(data).where(eq(userPreferences.userId, userId));
  } else {
    return db.insert(userPreferences).values({
      userId,
      ...data,
    });
  }
}
