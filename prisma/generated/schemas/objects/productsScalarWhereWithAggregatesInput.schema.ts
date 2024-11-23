import { z } from "zod";
import { IntWithAggregatesFilterObjectSchema } from "./IntWithAggregatesFilter.schema";
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema";
import { EnumstatusWithAggregatesFilterObjectSchema } from "./EnumstatusWithAggregatesFilter.schema";
import { statusSchema } from "../enums/status.schema";
import { DecimalWithAggregatesFilterObjectSchema } from "./DecimalWithAggregatesFilter.schema";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.productsScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => productsScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => productsScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => productsScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => productsScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => productsScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        image_url: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        name: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        status: z
            .union([
                z.lazy(() => EnumstatusWithAggregatesFilterObjectSchema),
                z.lazy(() => statusSchema),
            ])
            .optional(),
        price: z
            .union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()])
            .optional(),
        stock: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        available_at: z
            .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()])
            .optional(),
    })
    .strict();

export const productsScalarWhereWithAggregatesInputObjectSchema = Schema;
