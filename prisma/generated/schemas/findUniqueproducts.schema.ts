import { z } from "zod";
import { productsWhereUniqueInputObjectSchema } from "./objects/productsWhereUniqueInput.schema";

export const productsFindUniqueSchema = z.object({ where: productsWhereUniqueInputObjectSchema });
