import { z } from "zod";
import { statusSchema } from "../enums/status.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.EnumstatusFieldUpdateOperationsInput> = z
    .object({
        set: z.lazy(() => statusSchema).optional(),
    })
    .strict();

export const EnumstatusFieldUpdateOperationsInputObjectSchema = Schema;
