import { z } from "zod";

export const faqConfig = z.object({});

export type FaqConfig = z.infer<typeof faqConfig>;
