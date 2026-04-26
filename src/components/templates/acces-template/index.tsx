"use client";
import Welcome from "@/components/organisms/access/views/welcome";
import { useTranslations } from "next-intl";
import { AccessTemplateProps } from "./types";
import { variantMap } from "./constants";

export default function AccessTemplate({
  children,
  variant,
}: AccessTemplateProps) {
  const config = variantMap[variant];
  const tVariant = useTranslations(config.ns);
  const tCommon = useTranslations("Common");

  return (
    <div className="flex min-h-screen">
      <Welcome title={tVariant(config.key)} subtitle={tCommon("fillInfo")} />
      <div className="w-1/2 bg-background text-text flex items-center justify-center">
        <div className="items-center justify-center">{children}</div>
      </div>
    </div>
  );
}
