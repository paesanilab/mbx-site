import { z } from "zod";
import { productsWhereInputObjectSchema } from "./objects/productsWhereInput.schema";

export const productsDeleteManySchema = z.object({
    where: productsWhereInputObjectSchema.optional(),
});
