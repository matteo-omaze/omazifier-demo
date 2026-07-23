import { z } from "zod";

export const drawSelectConfig = z.object({});

export type DrawSelectConfig = z.infer<typeof drawSelectConfig>;
