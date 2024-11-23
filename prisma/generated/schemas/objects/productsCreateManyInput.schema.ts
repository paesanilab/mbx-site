import { z } from "zod";
import { statusSchema } from "../enums/status.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.productsCreateManyInput> = z
    .object({
        id: z.number().optional(),
        image_url: z.string(),
        name: z.string(),
        status: z.lazy(() => statusSchema),
        price: z.number(),
        stock: z.number(),
        available_at: z.coerce.date(),
    })
    .strict();

export const productsCreateManyInputObjectSchema = Schema;
