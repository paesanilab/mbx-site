import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.productsSumOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        price: z.lazy(() => SortOrderSchema).optional(),
        stock: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const productsSumOrderByAggregateInputObjectSchema = Schema;
