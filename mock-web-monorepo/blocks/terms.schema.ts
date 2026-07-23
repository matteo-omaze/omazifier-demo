import { z } from "zod";

export const termsConfig = z.object({});

export type TermsConfig = z.infer<typeof termsConfig>;
