"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, type LoginFormValues } from "./resolvers/login-resolver";
import { authService } from "@/services/auth";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

type AuthField = {
  id: keyof LoginFormValues;
  label: string;
  placeholder: string;
  type?: string;
};

const fields: AuthField[] = [
  {
    id: "email",
    label: "Email",
    placeholder: "Insira seu email...",
    type: "email",
  },
  {
    id: "password",
    label: "Senha",
    placeholder: "Insira sua senha...",
    type: "password",
  },
];

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authService.login(data);
      if (response.token && response.user) {
        dispatch(
          setCredentials({
            token: response.token,
            user: {
              id: response.user.id || "",
              name: response.user.name || "",
              email: response.user.email || "",
            },
          })
        );
        router.push("/projects");
      }
    } catch (error) {
      toast.error("Falha ao acessar. Verifique suas credenciais.");
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-100 max-w-lg flex-col gap-6 text-[var(--primary)]"
      >
        {fields.map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold text-[var(--divider)] mb-2">
                  {field.label}
                </FormLabel>
                <FormControl>
                  {field.type === "password" ? (
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={field.placeholder}
                        {...formField}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <Input
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      {...formField}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button asChild variant="link">
          <Link href="/register">Não possui conta ainda?</Link>
        </Button>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full max-w-3xs"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Acessando..." : "Acessar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}


