import { z } from "zod";
import { IntFilterObjectSchema } from "./IntFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { EnumstatusFilterObjectSchema } from "./EnumstatusFilter.schema";
import { statusSchema } from "../enums/status.schema";
import { DecimalFilterObjectSchema } from "./DecimalFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.productsWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => productsWhereInputObjectSchema),
                z.lazy(() => productsWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => productsWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => productsWhereInputObjectSchema),
                z.lazy(() => productsWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        image_url: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        status: z
            .union([z.lazy(() => EnumstatusFilterObjectSchema), z.lazy(() => statusSchema)])
            .optional(),
        price: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
        stock: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        available_at: z
            .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
            .optional(),
    })
    .strict();

export const productsWhereInputObjectSchema = Schema;
