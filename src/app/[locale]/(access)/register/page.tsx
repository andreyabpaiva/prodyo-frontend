import { RegisterForm } from "@/components/organisms/access/forms/register-form";
import AccessTemplate from "@/components/templates/acces-template";

export default function RegisterPage() {
  return (
    <AccessTemplate variant="register">
      <RegisterForm />
    </AccessTemplate>
  );
}
