import { z } from "zod";

export const offerGridConfig = z.object({
  columns: z.number().int().min(1).max(4).default(3),
});

export type OfferGridConfig = z.infer<typeof offerGridConfig>;
