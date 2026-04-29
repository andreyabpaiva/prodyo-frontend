import { z } from "zod";

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("emailRequired"))
      .check(z.email({ error: t("emailInvalid") })),
    password: z.string().min(1, t("passwordRequired")),
  });
