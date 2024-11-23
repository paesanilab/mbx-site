import { z } from "zod";
import { productsWhereUniqueInputObjectSchema } from "./objects/productsWhereUniqueInput.schema";
import { productsCreateInputObjectSchema } from "./objects/productsCreateInput.schema";
import { productsUncheckedCreateInputObjectSchema } from "./objects/productsUncheckedCreateInput.schema";
import { productsUpdateInputObjectSchema } from "./objects/productsUpdateInput.schema";
import { productsUncheckedUpdateInputObjectSchema } from "./objects/productsUncheckedUpdateInput.schema";

export const productsUpsertSchema = z.object({
    where: productsWhereUniqueInputObjectSchema,
    create: z.union([productsCreateInputObjectSchema, productsUncheckedCreateInputObjectSchema]),
    update: z.union([productsUpdateInputObjectSchema, productsUncheckedUpdateInputObjectSchema]),
});
