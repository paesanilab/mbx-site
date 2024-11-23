import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.ProductsAvgAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        price: z.literal(true).optional(),
        stock: z.literal(true).optional(),
    })
    .strict();

export const ProductsAvgAggregateInputObjectSchema = Schema;
