import { z } from "zod";

export const verifiedEntryConfig = z.object({
  provider: z.enum(["schufa", "postident"]),
});

export type VerifiedEntryConfig = z.infer<typeof verifiedEntryConfig>;
