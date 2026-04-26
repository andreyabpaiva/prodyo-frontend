import { type useTranslations } from "next-intl";
import { AccessTemplateVariant } from "./types";

export const variantMap: Record<AccessTemplateVariant, { ns: Parameters<typeof useTranslations>[0]; key: string }> = {
  login: { ns: "LoginPage", key: "welcome" },
  register: { ns: "RegisterPage", key: "welcome" },
  createProject: { ns: "CreateProject", key: "heading" },
};