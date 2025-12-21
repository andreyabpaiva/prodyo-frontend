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
        label: "Velocidade",
        icon: TrendingUp,
    },
    [ModelsIndicatorEnum.IndicatorReworkPerIteration]: {
        label: "Retrabalho",
        icon: RefreshCw,
    },
    [ModelsIndicatorEnum.IndicatorInstabilityIndex]: {
        label: "Instabilidade",
        icon: Gauge,
    },
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
        return { min: parts[0] ?? "", max: parts[1] ?? "" };
    }
    if (value.endsWith(" ")) {
        return { min: value.trim(), max: "" };
    }
    return { min: value, max: "" };
};

const sanitizeRangeInput = (value: string): string => {
    return value.replace(/[^0-9\s\-\.]/g, "");
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
            render={({ field }) => (
                <FormItem>
                    <div className="bg-[var(--primary)] rounded-xl border-3 border-[var(--text)] p-3">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-3">
                            <Icon className="w-4 h-4 text-[var(--text)]" />
                            <span className="text-sm font-semibold text-gray-700">{config.label}</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {/* OK */}
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-[var(--ok)] border-3 border-[var(--text)] font-bold py-0.5 rounded-full text-xs min-w-[4.25rem] justify-center"
                                >
                                    OK
                                </Badge>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="0 - 10"
                                        className="rounded-full border-3 bg-[var(--background)] text-center h-7 flex-1 text-sm"
                                        value={formatRangeValue(field.value?.ok)}
                                        onChange={(e) => {
                                            const sanitized = sanitizeRangeInput(e.target.value);
                                            const parsed = parseRangeValue(sanitized);
                                            field.onChange({ ...field.value, ok: parsed });
                                        }}
                                    />
                                </FormControl>
                            </div>

                            {/* Alert */}
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-[var(--alert)] border-3 border-[var(--text)] font-bold py-0.5 rounded-full text-xs min-w-[3.125rem] justify-center"
                                >
                                    ALERTA
                                </Badge>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="0 - 10"
                                        className="rounded-full bg-[var(--background)] border-3 text-center h-7 flex-1 text-sm"
                                        value={formatRangeValue(field.value?.alert)}
                                        onChange={(e) => {
                                            const sanitized = sanitizeRangeInput(e.target.value);
                                            const parsed = parseRangeValue(sanitized);
                                            field.onChange({ ...field.value, alert: parsed });
                                        }}
                                    />
                                </FormControl>
                            </div>

                            {/* Critical */}
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-[var(--critic)] border-3 border-[var(--text)] font-bold py-0.5 rounded-full text-xs min-w-[3.125rem] justify-center"
                                >
                                    CRÍTICO
                                </Badge>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="0 - 10"
                                        className="rounded-full border-3 bg-[var(--background)] text-center h-7 flex-1 text-sm"
                                        value={formatRangeValue(field.value?.critical)}
                                        onChange={(e) => {
                                            const sanitized = sanitizeRangeInput(e.target.value);
                                            const parsed = parseRangeValue(sanitized);
                                            field.onChange({ ...field.value, critical: parsed });
                                        }}
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
