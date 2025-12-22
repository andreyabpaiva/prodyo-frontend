"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema, type RegisterFormValues } from "./resolvers/register-resolver";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

type RegisterField = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
};

const registerFields: RegisterField[] = [
  { 
    id: "name", 
    label: "Nome *", 
    placeholder: "Insira seu nome...",
  },
  {
    id: "email",
    label: "Email *",
    type: "email",
    placeholder: "Insira seu email...",
  },
  {
    id: "password",
    label: "Senha *",
    type: "password",
    placeholder: "Insira sua senha...",
  },
  {
    id: "confirmPassword",
    label: "Confirme sua senha *",
    type: "password",
    placeholder: "Confirme sua senha...",
  },
];

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await authService.register(registerData);
      router.push("/login");
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-100 max-w-lg flex-col gap-6 text-[var(--primary)]"
      >
        {registerFields.map((field) => {
          const isPasswordField = field.type === "password";
          const isConfirmPassword = field.id === "confirmPassword";
          const showField = isConfirmPassword ? showConfirmPassword : showPassword;
          const setShowField = isConfirmPassword ? setShowConfirmPassword : setShowPassword;

          return (
            <FormField
              key={field.id}
              control={form.control}
              name={field.id as keyof RegisterFormValues}
              render={({ field: formField }) => (
                <FormItem>
                  <div className="flex items-center gap-3 mb-2">
                    <FormLabel className="text-sm font-bold text-[var(--divider)]">
                      {field.label}
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    {isPasswordField ? (
                      <div className="relative">
                        <Input
                          type={showField ? "text" : "password"}
                          placeholder={field.placeholder}
                          {...formField}
                        />
                        <button
                          type="button"
                          onClick={() => setShowField(!showField)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                          {showField ? (
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
                </FormItem>
              )}
            />
          );
        })}
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full max-w-3xs"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}


