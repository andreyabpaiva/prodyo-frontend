import { z } from "zod";

const rangeValueSchema = z.object({
    min: z.string().min(1, "Valor mínimo é obrigatório"),
    max: z.string().min(1, "Valor máximo é obrigatório"),
});

const indicatorRangeSchema = z.object({
    ok: rangeValueSchema,
    alert: rangeValueSchema,
    critical: rangeValueSchema,
});

// SpeedPerIteration: Higher is better (OK > Alert > Critical)
const speedRangeSchema = indicatorRangeSchema.refine(
    (data) => {
        const criticalMax = parseFloat(data.critical.max);
        const alertMin = parseFloat(data.alert.min);
        const alertMax = parseFloat(data.alert.max);
        const okMin = parseFloat(data.ok.min);
        return criticalMax <= alertMin && alertMax <= okMin;
    },
    {
        message: "Velocidade: Crítico deve ser menor que Alerta, e Alerta menor que OK",
    }
);

// ReworkPerIteration: Lower is better (OK < Alert < Critical)
const reworkRangeSchema = indicatorRangeSchema.refine(
    (data) => {
        const okMax = parseFloat(data.ok.max);
        const alertMin = parseFloat(data.alert.min);
        const alertMax = parseFloat(data.alert.max);
        const criticalMin = parseFloat(data.critical.min);
        return okMax <= alertMin && alertMax <= criticalMin;
    },
    {
        message: "Retrabalho: OK deve ser menor que Alerta, e Alerta menor que Crítico",
    }
);

// InstabilityIndex: Lower is better (OK < Alert < Critical)
const instabilityRangeSchema = indicatorRangeSchema.refine(
    (data) => {
        const okMax = parseFloat(data.ok.max);
        const alertMin = parseFloat(data.alert.min);
        const alertMax = parseFloat(data.alert.max);
        const criticalMin = parseFloat(data.critical.min);
        return okMax <= alertMin && alertMax <= criticalMin;
    },
    {
        message: "Instabilidade: OK deve ser menor que Alerta, e Alerta menor que Crítico",
    }
);

export const projectSchema = z.object({
    name: z.string().min(1, "Nome do projeto é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    members: z.array(z.string()).min(1, "Membros do projeto são obrigatórios"),
    colorSelect: z.string().optional(),
    indicatorRanges: z.object({
        SpeedPerIteration: speedRangeSchema,
        ReworkPerIteration: reworkRangeSchema,
        InstabilityIndex: instabilityRangeSchema,
    }),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
