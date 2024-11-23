import { z } from "zod";
import { productsOrderByWithRelationInputObjectSchema } from "./objects/productsOrderByWithRelationInput.schema";
import { productsWhereInputObjectSchema } from "./objects/productsWhereInput.schema";
import { productsWhereUniqueInputObjectSchema } from "./objects/productsWhereUniqueInput.schema";
import { productsScalarFieldEnumSchema } from "./enums/productsScalarFieldEnum.schema";

export const productsFindManySchema = z.object({
    orderBy: z
        .union([
            productsOrderByWithRelationInputObjectSchema,
            productsOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: productsWhereInputObjectSchema.optional(),
    cursor: productsWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.array(productsScalarFieldEnumSchema).optional(),
});
