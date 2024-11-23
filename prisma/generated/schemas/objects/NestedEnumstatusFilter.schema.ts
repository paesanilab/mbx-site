import { z } from "zod";
import { statusSchema } from "../enums/status.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.NestedEnumstatusFilter> = z
    .object({
        equals: z.lazy(() => statusSchema).optional(),
        in: z.union([z.lazy(() => statusSchema).array(), z.lazy(() => statusSchema)]).optional(),
        notIn: z.union([z.lazy(() => statusSchema).array(), z.lazy(() => statusSchema)]).optional(),
        not: z
            .union([z.lazy(() => statusSchema), z.lazy(() => NestedEnumstatusFilterObjectSchema)])
            .optional(),
    })
    .strict();

export const NestedEnumstatusFilterObjectSchema = Schema;
