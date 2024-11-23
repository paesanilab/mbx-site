import { z } from "zod";
import { productsCreateInputObjectSchema } from "./objects/productsCreateInput.schema";
import { productsUncheckedCreateInputObjectSchema } from "./objects/productsUncheckedCreateInput.schema";

export const productsCreateOneSchema = z.object({
    data: z.union([productsCreateInputObjectSchema, productsUncheckedCreateInputObjectSchema]),
});
