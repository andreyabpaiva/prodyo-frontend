import { RegisterForm } from "@/components/organisms/access/forms/register-form";
import TypeWriterComponent from "@/components/molecules/prodyo-type-writer";
import { MoveRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Welcome from "@/components/organisms/access/views/welcome";

export default async function RegisterPage() {
  const tRegister = await getTranslations("RegisterPage");
  const tCommon = await getTranslations("Common");

  return (
    <div className="flex min-h-screen">
      <Welcome title={tRegister("welcome")} subtitle={tCommon("fillInfo")} />
      <div className="w-1/2 bg-background flex items-center justify-center px-10">
        <RegisterForm />
      </div>
    </div>
  );
}
