import { z } from "zod";

export const drawConfirmConfig = z.object({
  imageUrl: z.string().optional(),
});

export type DrawConfirmConfig = z.infer<typeof drawConfirmConfig>;
