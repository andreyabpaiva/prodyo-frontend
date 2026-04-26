import { LoginForm } from "@/components/organisms/access/forms/login-form";
import AccessTemplate from "@/components/templates/acces-template";

export default function LoginPage() {
  return (
    <AccessTemplate variant="login">
      <LoginForm />
    </AccessTemplate>
  );
}
