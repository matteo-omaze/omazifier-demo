import { z } from "zod";

export const drawSuccessConfig = z.object({});

export type DrawSuccessConfig = z.infer<typeof drawSuccessConfig>;
