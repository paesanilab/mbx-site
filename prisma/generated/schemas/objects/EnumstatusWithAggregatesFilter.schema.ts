import { z } from "zod";
import { statusSchema } from "../enums/status.schema";
import { NestedEnumstatusWithAggregatesFilterObjectSchema } from "./NestedEnumstatusWithAggregatesFilter.schema";
import { NestedIntFilterObjectSchema } from "./NestedIntFilter.schema";
import { NestedEnumstatusFilterObjectSchema } from "./NestedEnumstatusFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.EnumstatusWithAggregatesFilter> = z
    .object({
        equals: z.lazy(() => statusSchema).optional(),
        in: z.union([z.lazy(() => statusSchema).array(), z.lazy(() => statusSchema)]).optional(),
        notIn: z.union([z.lazy(() => statusSchema).array(), z.lazy(() => statusSchema)]).optional(),
        not: z
            .union([
                z.lazy(() => statusSchema),
                z.lazy(() => NestedEnumstatusWithAggregatesFilterObjectSchema),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
        _min: z.lazy(() => NestedEnumstatusFilterObjectSchema).optional(),
        _max: z.lazy(() => NestedEnumstatusFilterObjectSchema).optional(),
    })
    .strict();

export const EnumstatusWithAggregatesFilterObjectSchema = Schema;
