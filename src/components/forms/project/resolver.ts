import { z } from "zod";

const parseDecimal = (value: string): number => {
    return parseFloat(value.replace(",", "."));
};

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
            const criticalMin = parseDecimal(data.critical.min);
            const criticalMax = parseDecimal(data.critical.max);
            const alertMin = parseDecimal(data.alert.min);
            const alertMax = parseDecimal(data.alert.max);
            const okMin = parseDecimal(data.ok.min);
            const okMax = parseDecimal(data.ok.max);

            return criticalMin < criticalMax && alertMin < alertMax && okMin < okMax;
        },
        {
            message: "O valor mínimo deve ser menor que o máximo em cada faixa",
        }
    )
    .refine(
        (data) => {
            const criticalMax = parseDecimal(data.critical.max);
            const alertMin = parseDecimal(data.alert.min);
            const alertMax = parseDecimal(data.alert.max);
            const okMin = parseDecimal(data.ok.min);

            return criticalMax < alertMin && alertMax < okMin;
        },
        {
            message: "As faixas devem seguir a ordem: Crítico < Alerta < OK",
        }
    );

const reworkRangeSchema = indicatorRangeSchema
    .refine(
        (data) => {
            const criticalMin = parseDecimal(data.critical.min);
            const criticalMax = parseDecimal(data.critical.max);
            const alertMin = parseDecimal(data.alert.min);
            const alertMax = parseDecimal(data.alert.max);
            const okMin = parseDecimal(data.ok.min);
            const okMax = parseDecimal(data.ok.max);

            return criticalMin < criticalMax && alertMin < alertMax && okMin < okMax;
        },
        {
            message: "O valor mínimo deve ser menor que o máximo em cada faixa",
        }
    )
    .refine(
        (data) => {
            const okMax = parseDecimal(data.ok.max);
            const alertMin = parseDecimal(data.alert.min);
            const alertMax = parseDecimal(data.alert.max);
            const criticalMin = parseDecimal(data.critical.min);

            return okMax < alertMin && alertMax < criticalMin;
        },
        {
            message: "As faixas devem seguir a ordem: OK < Alerta < Crítico",
        }
    );

const instabilityRangeSchema = indicatorRangeSchema
    .refine(
        (data) => {
            const criticalMin = parseDecimal(data.critical.min);
            const criticalMax = parseDecimal(data.critical.max);
            const alertMin = parseDecimal(data.alert.min);
            const alertMax = parseDecimal(data.alert.max);
            const okMin = parseDecimal(data.ok.min);
            const okMax = parseDecimal(data.ok.max);

            return criticalMin < criticalMax && alertMin < alertMax && okMin < okMax;
        },
        {
            message: "O valor mínimo deve ser menor que o máximo em cada faixa",
        }
    )
    .refine(
        (data) => {
            const okMax = parseDecimal(data.ok.max);
            const alertMin = parseDecimal(data.alert.min);
            const alertMax = parseDecimal(data.alert.max);
            const criticalMin = parseDecimal(data.critical.min);

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
