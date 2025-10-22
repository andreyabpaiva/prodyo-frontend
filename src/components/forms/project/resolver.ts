import { z } from "zod";

export const projectSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Description is required"),
    members: z.array(z.string().optional()),
    colorSelect: z.string().optional(),
    prodRange: z.object({
        ok: z.string().min(1, "OK range is required"),
        alert: z.string().min(1, "Alert range is required"),
        critical: z.string().min(1, "Critical range is required"),
    }),
});