import { z } from "zod";
import { productsUpdateManyMutationInputObjectSchema } from "./objects/productsUpdateManyMutationInput.schema";
import { productsWhereInputObjectSchema } from "./objects/productsWhereInput.schema";

export const productsUpdateManySchema = z.object({
    data: productsUpdateManyMutationInputObjectSchema,
    where: productsWhereInputObjectSchema.optional(),
});
