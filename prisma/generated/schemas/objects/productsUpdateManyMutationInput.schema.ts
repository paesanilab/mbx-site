import { z } from "zod";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { statusSchema } from "../enums/status.schema";
import { EnumstatusFieldUpdateOperationsInputObjectSchema } from "./EnumstatusFieldUpdateOperationsInput.schema";
import { DecimalFieldUpdateOperationsInputObjectSchema } from "./DecimalFieldUpdateOperationsInput.schema";
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.productsUpdateManyMutationInput> = z
    .object({
        image_url: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        name: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        status: z
            .union([
                z.lazy(() => statusSchema),
                z.lazy(() => EnumstatusFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        price: z
            .union([z.number(), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        stock: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        available_at: z
            .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
            .optional(),
    })
    .strict();

export const productsUpdateManyMutationInputObjectSchema = Schema;
