import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { productsCountOrderByAggregateInputObjectSchema } from "./productsCountOrderByAggregateInput.schema";
import { productsAvgOrderByAggregateInputObjectSchema } from "./productsAvgOrderByAggregateInput.schema";
import { productsMaxOrderByAggregateInputObjectSchema } from "./productsMaxOrderByAggregateInput.schema";
import { productsMinOrderByAggregateInputObjectSchema } from "./productsMinOrderByAggregateInput.schema";
import { productsSumOrderByAggregateInputObjectSchema } from "./productsSumOrderByAggregateInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.productsOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        image_url: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        status: z.lazy(() => SortOrderSchema).optional(),
        price: z.lazy(() => SortOrderSchema).optional(),
        stock: z.lazy(() => SortOrderSchema).optional(),
        available_at: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => productsCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => productsAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => productsMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => productsMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => productsSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const productsOrderByWithAggregationInputObjectSchema = Schema;
