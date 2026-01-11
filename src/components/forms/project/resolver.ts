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

const speedRangeSchema = indicatorRangeSchema
    .refine(
        (data) => {
            const criticalMin = parseFloat(data.critical.min);
            const criticalMax = parseFloat(data.critical.max);
            const alertMin = parseFloat(data.alert.min);
            const alertMax = parseFloat(data.alert.max);
            const okMin = parseFloat(data.ok.min);
            const okMax = parseFloat(data.ok.max);

            return criticalMin < criticalMax && alertMin < alertMax && okMin < okMax;
        },
        {
            message: "O valor mínimo deve ser menor que o máximo em cada faixa",
        }
    )
    .refine(
        (data) => {
            const criticalMax = parseFloat(data.critical.max);
            const alertMin = parseFloat(data.alert.min);
            const alertMax = parseFloat(data.alert.max);
            const okMin = parseFloat(data.ok.min);

            return criticalMax < alertMin && alertMax < okMin;
        },
        {
            message: "As faixas devem seguir a ordem: Crítico < Alerta < OK",
        }
    );

const reworkRangeSchema = indicatorRangeSchema
    .refine(
        (data) => {
            const criticalMin = parseFloat(data.critical.min);
            const criticalMax = parseFloat(data.critical.max);
            const alertMin = parseFloat(data.alert.min);
            const alertMax = parseFloat(data.alert.max);
            const okMin = parseFloat(data.ok.min);
            const okMax = parseFloat(data.ok.max);

            return criticalMin < criticalMax && alertMin < alertMax && okMin < okMax;
        },
        {
            message: "O valor mínimo deve ser menor que o máximo em cada faixa",
        }
    )
    .refine(
        (data) => {
            const okMax = parseFloat(data.ok.max);
            const alertMin = parseFloat(data.alert.min);
            const alertMax = parseFloat(data.alert.max);
            const criticalMin = parseFloat(data.critical.min);

            return okMax < alertMin && alertMax < criticalMin;
        },
        {
            message: "As faixas devem seguir a ordem: OK < Alerta < Crítico",
        }
    );

const instabilityRangeSchema = indicatorRangeSchema
    .refine(
        (data) => {
            const criticalMin = parseFloat(data.critical.min);
            const criticalMax = parseFloat(data.critical.max);
            const alertMin = parseFloat(data.alert.min);
            const alertMax = parseFloat(data.alert.max);
            const okMin = parseFloat(data.ok.min);
            const okMax = parseFloat(data.ok.max);

            return criticalMin < criticalMax && alertMin < alertMax && okMin < okMax;
        },
        {
            message: "O valor mínimo deve ser menor que o máximo em cada faixa",
        }
    )
    .refine(
        (data) => {
            const okMax = parseFloat(data.ok.max);
            const alertMin = parseFloat(data.alert.min);
            const alertMax = parseFloat(data.alert.max);
            const criticalMin = parseFloat(data.critical.min);

            return okMax < alertMin && alertMax < criticalMin;
        },
        {
            message: "As faixas devem seguir a ordem: OK < Alerta < Crítico",
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
