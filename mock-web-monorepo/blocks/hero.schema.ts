import { z } from "zod";

export const heroConfig = z.object({
  links: z.array(z.object({ to: z.string(), labelId: z.string() })).default([]),
  imageUrl: z.string().optional(),
  primaryCtaLabelId: z.string().optional(),
});

export type HeroConfig = z.infer<typeof heroConfig>;
