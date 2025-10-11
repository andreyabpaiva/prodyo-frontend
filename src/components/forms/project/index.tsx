"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type ProjectFormValues = {
    name: string;
    description: string;
};

export default function ProjectForm() {
    const form = useForm<ProjectFormValues>({
        defaultValues: {
            name: "Nome projeto exemplo",
            description: "",
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => console.log(data))}
                className="space-y-6"
            >
                {/* Nome do projeto */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm text-muted-foreground">
                                Nome do projeto
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="
                    border-none 
                    bg-transparent 
                    p-0 
                    text-xl 
                    font-semibold 
                    focus-visible:ring-0 
                    focus-visible:outline-none 
                    focus-visible:ring-offset-0 
                    shadow-none
                  "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Descrição */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm text-muted-foreground">
                                Descrição
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="
                    border-none 
                    bg-transparent 
                    p-0 
                    text-base 
                    focus-visible:ring-0 
                    focus-visible:outline-none 
                    focus-visible:ring-offset-0 
                    shadow-none
                  "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Salvar</Button>
            </form>
        </Form>
    );
}
