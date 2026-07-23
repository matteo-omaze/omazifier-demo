import { z } from "zod";

export const openEntryConfig = z.object({});

export type OpenEntryConfig = z.infer<typeof openEntryConfig>;
