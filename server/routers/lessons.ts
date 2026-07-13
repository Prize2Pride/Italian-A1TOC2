import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import * as db from "../db";

export const lessonsRouter = router({
  // Get all lessons (public)
  list: publicProcedure
    .input(z.object({ level: z.string().optional() }).optional())
    .query(async ({ input }) => {
      if (input?.level) {
        return db.getLessonsByLevel(input.level);
      }
      return db.getAllLessons();
    }),

  // Get a specific lesson (public)
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return db.getLessonById(input.id);
    }),

  // Get user progress for a lesson (protected)
  getProgress: protectedProcedure
    .input(z.object({ lessonId: z.number() }))
    .query(async ({ input, ctx }) => {
      return db.getLessonProgress(ctx.user.id, input.lessonId);
    }),

  // Update lesson progress (protected)
  updateProgress: protectedProcedure
    .input(
      z.object({
        lessonId: z.number(),
        isCompleted: z.boolean().optional(),
        quizScore: z.number().optional(),
        timeSpent: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { lessonId, ...data } = input;
      return db.updateLessonProgress(ctx.user.id, lessonId, {
        ...data,
        updatedAt: new Date(),
      });
    }),

  // Get user's overall progress (protected)
  getUserProgress: protectedProcedure.query(async ({ ctx }) => {
    return db.getUserProgress(ctx.user.id);
  }),
});
