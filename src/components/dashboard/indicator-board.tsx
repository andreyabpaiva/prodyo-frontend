import { Action, Cause, Indicator, ProductivityLevel } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActionDialog, CauseActionDialog, CauseDialog, IndicatorAnalysisDialog } from "@/components/dashboard/modals";

const metricCopy = {
    WORK_VELOCITY: {
        title: "VELOCIDADE",
        yLabel: "TEMP",
        xLabel: "TAM",
        color: "#83B3FF",
    },
    REWORK_INDEX: {
        title: "ÍNDICE DE RETRABALHO",
        yLabel: "BUGS",
        xLabel: "TAR",
        color: "#FF6B6B",
    },
    INSTABILITY_INDEX: {
        title: "ÍNDICE DE INSTABILIDADE",
        yLabel: "MEL",
        xLabel: "TAR",
        color: "#B9FF94",
    },
};

function StatusBadge({ level }: { level: ProductivityLevel }) {
    const text = level === "CRITICAL" ? "CRÍTICO" : level === "ALERT" ? "ALERTA" : "OK";
    const tone =
        level === "CRITICAL" ? "bg-[var(--critic)] text-[var(--primary)]" : level === "ALERT" ? "bg-[var(--alert)] text-[var(--dark)]" : "bg-[var(--ok)] text-[var(--dark)]";
    return (
        <Badge className={`rounded-full border-[3px] border-[--dark] px-6 py-1 text-sm font-bold ${tone}`}>
            {text}
        </Badge>
    );
}

function LineChart({ values, color }: { values: number[]; color: string }) {
    const max = Math.max(...values);
    const points = values
        .map((value, index) => {
            const x = (index / (values.length - 1)) * 100;
            const y = 100 - (value / max) * 70 - 15;
            return `${x},${y}`;
        })
        .join(" ");
    return (
        <svg viewBox="0 0 100 100" className="h-40 w-full">
            <polyline fill="none" stroke={color} strokeWidth={4} points={points} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IndicatorPanel({ indicator }: { indicator: Indicator }) {
    const copy = metricCopy[indicator.metric];
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end">
                <StatusBadge level={indicator.productivityLevel} />
            </div>
            <div className="flex flex-col gap-4 rounded-[32px] border-[3px] border-[--dark] bg-[var(--primary)] px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        {/* <p className="text-sm font-semibold uppercase text-[--divider]">{copy.yLabel}</p> */}
                        <p className="text-md font-bold">{copy.title}</p>
                    </div>

                </div>
                <div>
                    <LineChart values={indicator.valueSeries} color={copy.color} />
                    <div className="flex justify-between text-xs font-semibold uppercase tracking-[0.3em] text-[--divider]">
                        <span>{copy.xLabel}</span>
                        <span>{indicator.labels.join("   ")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function IndicatorBoard({ indicators, causes, actions }: { indicators: Indicator[]; causes: Cause[]; actions: Action[] }) {
    const velocity = indicators.find((indicator) => indicator.metric === "WORK_VELOCITY");
    const rework = indicators.find((indicator) => indicator.metric === "REWORK_INDEX");
    const instability = indicators.find((indicator) => indicator.metric === "INSTABILITY_INDEX");
    const indicatorIds = new Set(indicators.map((indicator) => indicator.id));
    const indicatorCauses = causes.filter((cause) => indicatorIds.has(cause.indicatorId));
    const indicatorActions = actions.filter((action) => indicatorIds.has(action.indicatorId));

    return (
        <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-end gap-4 text-[--primary]">
                {/* <StatusBadge level={velocity?.productivityLevel ?? "OK"} /> */}
                <IndicatorAnalysisDialog
                    trigger={
                        <Button variant="default">
                            Visualizar análise do indicador
                        </Button>
                    }
                    causes={indicatorCauses}
                    actions={indicatorActions}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {velocity && <IndicatorPanel indicator={velocity} />}
                {rework && <IndicatorPanel indicator={rework} />}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <CauseDialog
                    level="ALERT"
                    metricLabel="ÍNDICE DE RETRABALHO"
                    trigger={
                        <Button className="rounded-full border-[3px] border-[--dark] bg-[--alert] text-[--dark]">
                            + Adicionar causa
                        </Button>
                    }
                />
                {/* <Badge className="rounded-full border-[3px] border-[--dark] bg-[--alert] px-5 py-1 text-sm font-bold text-[--dark]">
                    ALERTA
                </Badge> */}
            </div>

            {instability && <IndicatorPanel indicator={instability} />}

            <div className="flex flex-wrap items-center gap-4">
                <ActionDialog
                    metricLabel="ÍNDICE DE INSTABILIDADE"
                    trigger={
                        <Button className="rounded-full border-[3px] border-[--dark] bg-[--critic] text-[--primary]">
                            + Adicionar ação
                        </Button>
                    }
                />
                <CauseActionDialog
                    metricLabel="ÍNDICE DE RETRABALHO"
                    trigger={
                        <Button variant="outline" className="rounded-full border-[3px] border-[--dark] bg-[--primary] text-[--dark]">
                            Relacionar causa + ação
                        </Button>
                    }
                />
                <Badge className="rounded-full border-[3px] border-[--dark] bg-[--critic] px-5 py-1 text-sm font-bold text-[--primary]">
                    CRÍTICO
                </Badge>
            </div>
        </section>
    );
}

