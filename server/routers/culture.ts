import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import * as db from "../db";

export const cultureRouter = router({
  // Get all culture modules (public)
  list: publicProcedure.query(async () => {
    return db.getAllCultureModules();
  }),

  // Get culture modules by category (public)
  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      return db.getCultureModulesByCategory(input.category);
    }),

  // Get culture modules by CEFR level (public)
  getByLevel: publicProcedure
    .input(z.object({ level: z.string() }))
    .query(async ({ input }) => {
      return db.getCultureModulesByLevel(input.level);
    }),

  // Get a specific culture module (public)
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return db.getCultureModuleById(input.id);
    }),
});
