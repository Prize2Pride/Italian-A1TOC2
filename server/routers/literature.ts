import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import * as db from "../db";

export const literatureRouter = router({
  // Get all literature timeline entries (public)
  list: publicProcedure.query(async () => {
    return db.getAllLiteratureTimeline();
  }),

  // Get literature by CEFR level (public)
  getByLevel: publicProcedure
    .input(z.object({ level: z.string() }))
    .query(async ({ input }) => {
      return db.getLiteratureTimelineByLevel(input.level);
    }),

  // Get a specific literature entry (public)
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return db.getLiteratureTimelineById(input.id);
    }),
});
