import { z } from "zod";
import { productsUpdateInputObjectSchema } from "./objects/productsUpdateInput.schema";
import { productsUncheckedUpdateInputObjectSchema } from "./objects/productsUncheckedUpdateInput.schema";
import { productsWhereUniqueInputObjectSchema } from "./objects/productsWhereUniqueInput.schema";

export const productsUpdateOneSchema = z.object({
    data: z.union([productsUpdateInputObjectSchema, productsUncheckedUpdateInputObjectSchema]),
    where: productsWhereUniqueInputObjectSchema,
});
