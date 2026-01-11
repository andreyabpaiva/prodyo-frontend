"use client";

import { Badge } from "@/components/ui/badge";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { ModelsIndicatorEnum } from "@/apis/data-contracts";
import { Gauge, RefreshCw, TrendingUp } from "lucide-react";

interface IndicatorRangeProps {
    indicatorType: ModelsIndicatorEnum;
}

const INDICATOR_CONFIG: Record<ModelsIndicatorEnum, {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}> = {
    [ModelsIndicatorEnum.IndicatorSpeedPerIteration]: {
        label: "Velocidade da Iteração",
        icon: TrendingUp,
    },
    [ModelsIndicatorEnum.IndicatorReworkPerIteration]: {
        label: "Ìndice de Retrabalho",
        icon: RefreshCw,
    },
    [ModelsIndicatorEnum.IndicatorInstabilityIndex]: {
        label: "Ìndice de Instabilidade",
        icon: Gauge,
    },
};

const sanitizeNumericInput = (value: string): string => {

    let sanitized = value.replace(/[^0-9,]/g, "");

    const parts = sanitized.split(",");
    if (parts.length > 2) {
        sanitized = parts[0] + "," + parts.slice(1).join("");
    }

    if (parts.length === 2 && parts[1].length > 2) {
        sanitized = parts[0] + "," + parts[1].substring(0, 2);
    }

    return sanitized;
};

export function IndicatorRange({ indicatorType }: IndicatorRangeProps) {
    const form = useFormContext();
    const fieldName = `indicatorRanges.${indicatorType}` as const;
    const config = INDICATOR_CONFIG[indicatorType];
    const Icon = config.icon;

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field, fieldState }) => (
                <FormItem>
                    <div className="bg-[var(--primary)] rounded-xl border-3 border-[var(--text)] p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Icon className="w-4 h-4 text-[var(--text)]" />
                            <span className="text-sm font-semibold text-gray-700">{config.label}</span>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-[var(--ok)] border-3 border-[var(--text)] font-bold py-0.5 rounded-full text-xs min-w-[9rem] justify-center"
                                >
                                    OK
                                </Badge>
                                <div className="flex mx-5 gap-2">
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="Min"
                                            className="rounded-full border-3 bg-[var(--background)] text-center h-7 flex-1 text-sm"
                                            value={field.value?.ok?.min ?? ""}
                                            onChange={(e) => {
                                                const sanitized = sanitizeNumericInput(e.target.value);
                                                field.onChange({
                                                    ...field.value,
                                                    ok: { ...field.value?.ok, min: sanitized }
                                                });
                                            }}
                                        />
                                    </FormControl>
                                    -
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="Max"
                                            className="rounded-full border-3 bg-[var(--background)] text-center h-7 flex-1 text-sm"
                                            value={field.value?.ok?.max ?? ""}
                                            onChange={(e) => {
                                                const sanitized = sanitizeNumericInput(e.target.value);
                                                field.onChange({
                                                    ...field.value,
                                                    ok: { ...field.value?.ok, max: sanitized }
                                                });
                                            }}
                                        />
                                    </FormControl>
                                </div>
                            </div>

                            {/* Alert */}
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-[var(--alert)] border-3 border-[var(--text)] font-bold py-0.5 rounded-full text-xs min-w-[9rem] justify-center"
                                >
                                    ALERTA
                                </Badge>
                                <div className="flex mx-5 gap-2">
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="Min"
                                            className="rounded-full bg-[var(--background)] border-3 text-center h-7 flex-1 text-sm"
                                            value={field.value?.alert?.min ?? ""}
                                            onChange={(e) => {
                                                const sanitized = sanitizeNumericInput(e.target.value);
                                                field.onChange({
                                                    ...field.value,
                                                    alert: { ...field.value?.alert, min: sanitized }
                                                });
                                            }}
                                        />
                                    </FormControl>
                                    -
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="Max"
                                            className="rounded-full bg-[var(--background)] border-3 text-center h-7 flex-1 text-sm"
                                            value={field.value?.alert?.max ?? ""}
                                            onChange={(e) => {
                                                const sanitized = sanitizeNumericInput(e.target.value);
                                                field.onChange({
                                                    ...field.value,
                                                    alert: { ...field.value?.alert, max: sanitized }
                                                });
                                            }}
                                        />
                                    </FormControl>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-[var(--critic)] border-3 border-[var(--text)] font-bold py-0.5 rounded-full text-xs min-w-[9rem] justify-center"
                                >
                                    CRÍTICO
                                </Badge>
                                <div className="flex mx-5 gap-2">
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="Min"
                                            className="rounded-full border-3 bg-[var(--background)] text-center h-7 flex-1 text-sm"
                                            value={field.value?.critical?.min ?? ""}
                                            onChange={(e) => {
                                                const sanitized = sanitizeNumericInput(e.target.value);
                                                field.onChange({
                                                    ...field.value,
                                                    critical: { ...field.value?.critical, min: sanitized }
                                                });
                                            }}
                                        />
                                    </FormControl>
                                    -
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="Max"
                                            className="rounded-full border-3 bg-[var(--background)] text-center h-7 flex-1 text-sm"
                                            value={field.value?.critical?.max ?? ""}
                                            onChange={(e) => {
                                                const sanitized = sanitizeNumericInput(e.target.value);
                                                field.onChange({
                                                    ...field.value,
                                                    critical: { ...field.value?.critical, max: sanitized }
                                                });
                                            }}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    {fieldState.error && <FormMessage />}
                </FormItem>
            )}
        />
    );
}
