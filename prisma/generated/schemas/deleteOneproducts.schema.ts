import { z } from "zod";
import { productsWhereUniqueInputObjectSchema } from "./objects/productsWhereUniqueInput.schema";

export const productsDeleteOneSchema = z.object({ where: productsWhereUniqueInputObjectSchema });
