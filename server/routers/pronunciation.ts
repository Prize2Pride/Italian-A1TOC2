import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import * as db from "../db";

export const pronunciationRouter = router({
  // Get all pronunciation guides (public)
  list: publicProcedure.query(async () => {
    return db.getAllPronunciationGuides();
  }),

  // Get pronunciation guides by lesson (public)
  getByLesson: publicProcedure
    .input(z.object({ lessonId: z.number() }))
    .query(async ({ input }) => {
      return db.getPronunciationGuidesByLesson(input.lessonId);
    }),

  // Get pronunciation guide by word (public)
  getByWord: publicProcedure
    .input(z.object({ word: z.string() }))
    .query(async ({ input }) => {
      return db.getPronunciationGuideByWord(input.word);
    }),
});
