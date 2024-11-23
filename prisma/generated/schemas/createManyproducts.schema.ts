import { z } from "zod";
import { productsCreateManyInputObjectSchema } from "./objects/productsCreateManyInput.schema";

export const productsCreateManySchema = z.object({
    data: z.union([
        productsCreateManyInputObjectSchema,
        z.array(productsCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
});
