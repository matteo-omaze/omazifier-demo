import { z } from "zod";

export const charityAdConfig = z.object({});

export type CharityAdConfig = z.infer<typeof charityAdConfig>;
