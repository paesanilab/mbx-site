import { z } from "zod";

export const statusSchema = z.enum(["active", "inactive", "archived"]);
