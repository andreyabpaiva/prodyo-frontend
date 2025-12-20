"use client";

import { Badge } from "@/components/ui/badge";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { ModelsIndicatorEnum } from "@/apis/data-contracts";

interface IndicatorRangeProps {
    indicatorType: ModelsIndicatorEnum;
}

const INDICATOR_LABELS: Record<ModelsIndicatorEnum, string> = {
    [ModelsIndicatorEnum.IndicatorSpeedPerIteration]: "Velocidade por Iteração",
    [ModelsIndicatorEnum.IndicatorReworkPerIteration]: "Retrabalho por Iteração",
    [ModelsIndicatorEnum.IndicatorInstabilityIndex]: "Índice de Instabilidade",
};

const formatRangeValue = (range?: { min?: string; max?: string }): string => {
    const min = range?.min ?? "";
    const max = range?.max ?? "";
    if (!min && !max) return "";
    if (min && max) return `${min} - ${max}`;
    if (min && !max) return min;
    return `- ${max}`;
};

const parseRangeValue = (value: string): { min: string; max: string } => {
    if (value.includes(" - ")) {
        const parts = value.split(" - ");
        return {
            min: parts[0] ?? "",
            max: parts[1] ?? "",
        };
    }

    if (value.endsWith(" ")) {
        return {
            min: value.trim(),
            max: "",
        };
    }

    return {
        min: value,
        max: "",
    };
};

export function IndicatorRange({ indicatorType }: IndicatorRangeProps) {
    const form = useFormContext();
    const fieldName = `indicatorRanges.${indicatorType}` as const;

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className="flex flex-col gap-4">
                    <FormLabel className="text-lg font-semibold">
                        {INDICATOR_LABELS[indicatorType]}
                    </FormLabel>

                    <div className="flex flex-col gap-3">
                        {/* OK Range */}
                        <div className="flex items-center gap-3">
                            <Badge
                                variant="outline"
                                className="bg-[var(--ok)] border-3 font-bold px-5 py-1 rounded-full min-w-[140px] text-center"
                            >
                                OK
                            </Badge>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="0 - 10"
                                    className="rounded-full border-3 text-center h-8 flex-1"
                                    value={formatRangeValue(field.value?.ok)}
                                    onChange={(e) => {
                                        const parsed = parseRangeValue(e.target.value);
                                        field.onChange({
                                            ...field.value,
                                            ok: parsed,
                                        });
                                    }}
                                />
                            </FormControl>
                        </div>

                        {/* Alert Range */}
                        <div className="flex items-center gap-3">
                            <Badge
                                variant="outline"
                                className="bg-[var(--alert)] border-3 font-bold px-5 py-1 rounded-full min-w-[140px] text-center"
                            >
                                ALERTA
                            </Badge>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="0 - 10"
                                    className="rounded-full border-3 text-center h-8 flex-1"
                                    value={formatRangeValue(field.value?.alert)}
                                    onChange={(e) => {
                                        const parsed = parseRangeValue(e.target.value);
                                        field.onChange({
                                            ...field.value,
                                            alert: parsed,
                                        });
                                    }}
                                />
                            </FormControl>
                        </div>

                        {/* Critical Range */}
                        <div className="flex items-center gap-3">
                            <Badge
                                variant="outline"
                                className="bg-[var(--critic)] border-3 font-bold px-5 py-1 rounded-full min-w-[140px] text-center"
                            >
                                CRÍTICO
                            </Badge>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="0 - 10"
                                    className="rounded-full border-3 text-center h-8 flex-1"
                                    value={formatRangeValue(field.value?.critical)}
                                    onChange={(e) => {
                                        const parsed = parseRangeValue(e.target.value);
                                        field.onChange({
                                            ...field.value,
                                            critical: parsed,
                                        });
                                    }}
                                />
                            </FormControl>
                        </div>
                    </div>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
