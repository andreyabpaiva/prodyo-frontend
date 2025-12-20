import { z } from "zod";

const rangeValueSchema = z.object({
    min: z.string().optional(),
    max: z.string().optional(),
});

const indicatorRangeSchema = z.object({
    ok: rangeValueSchema.optional(),
    alert: rangeValueSchema.optional(),
    critical: rangeValueSchema.optional(),
});

export const projectSchema = z.object({
    name: z.string().min(1, "Nome do projeto é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    members: z.array(z.string()),
    colorSelect: z.string().optional(),
    indicatorRanges: z.object({
        SpeedPerIteration: indicatorRangeSchema.optional(),
        ReworkPerIteration: indicatorRangeSchema.optional(),
        InstabilityIndex: indicatorRangeSchema.optional(),
    }).optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
