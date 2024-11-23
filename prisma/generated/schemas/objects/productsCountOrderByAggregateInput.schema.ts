import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.productsCountOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        image_url: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        status: z.lazy(() => SortOrderSchema).optional(),
        price: z.lazy(() => SortOrderSchema).optional(),
        stock: z.lazy(() => SortOrderSchema).optional(),
        available_at: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const productsCountOrderByAggregateInputObjectSchema = Schema;
