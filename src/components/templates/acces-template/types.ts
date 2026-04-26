import { ReactNode } from "react";

export type AccessTemplateVariant = "login" | "register" | "createProject";

export type AccessTemplateProps = {
  children: ReactNode;
  variant: AccessTemplateVariant;
};