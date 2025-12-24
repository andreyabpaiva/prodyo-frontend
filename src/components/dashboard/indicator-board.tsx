import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CauseActionDialog, CauseDialog } from "@/components/dashboard/modals";
import { ModelsIndicatorAnalysisData, ModelsProductivityEnum } from "@/apis/data-contracts";
import { ProductivityLevel } from "@/types/domain";

function convertProductivityLevel(level: ModelsProductivityEnum | undefined): ProductivityLevel {
    if (level === ModelsProductivityEnum.ProductivityCritical) return "CRITICAL";
    if (level === ModelsProductivityEnum.ProductivityAlert) return "ALERT";
    return "OK";
}

const metricCopy = {
    SpeedPerIteration: {
        title: "VELOCIDADE",
        color: "#83B3FF",
    },
    ReworkPerIteration: {
        title: "ÍNDICE DE RETRABALHO",
        color: "#FF6B6B",
    },
    InstabilityIndex: {
        title: "ÍNDICE DE INSTABILIDADE",
        color: "#B9FF94",
    },
};

function StatusBadge({ level }: { level: ModelsProductivityEnum | undefined }) {
    const text = level === ModelsProductivityEnum.ProductivityCritical ? "CRÍTICO" : level === ModelsProductivityEnum.ProductivityAlert ? "ALERTA" : "OK";
    const tone =
        level === ModelsProductivityEnum.ProductivityCritical ? "bg-[var(--critic)] text-[var(--dark)] border-[var(--dark)]" : level === ModelsProductivityEnum.ProductivityAlert ? "bg-[var(--alert)] text-[var(--dark)]" : "bg-[var(--ok)] text-[var(--dark)]";
    return (
        <Badge className={`rounded-full border-[3px] px-6 py-1 text-sm font-bold ${tone}`}>
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

function IndicatorPanel({ analysisData }: { analysisData: ModelsIndicatorAnalysisData }) {
    const copy = metricCopy[analysisData.indicatorType as keyof typeof metricCopy];

    const yValues = analysisData.points?.map(point => point.y || 0) || [];
    const xLabels = analysisData.points?.map(point => point.x?.toString() || "") || [];
    const latestStatus = analysisData.points?.[analysisData.points.length - 1]?.status;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 justify-end">

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <CauseDialog
                        level={convertProductivityLevel(latestStatus)}
                        metricLabel={copy.title}
                        trigger={
                            <Button variant={"default"} size={"sm"}>
                                + Adicionar causa
                            </Button>
                        }
                    />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <CauseActionDialog
                        metricLabel={copy.title}
                        trigger={
                            <Button variant={"default"} size={"sm"}>
                                + Adicionar ação
                            </Button>
                        }
                    />
                </div>
                <StatusBadge level={latestStatus} />
            </div>
            <div className="flex flex-col gap-4 rounded-[32px] border-[3px] border-[--dark] bg-[var(--primary)] px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-md font-bold">{copy.title}</p>
                    </div>
                </div>
                <div>
                    <LineChart values={yValues} color={copy.color} />
                    <div className="flex justify-between text-xs font-semibold uppercase tracking-[0.3em] text-[--divider]">
                        <span>{analysisData.xAxis?.label || ""}</span>
                        <span>{xLabels.join("   ")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function IndicatorBoard({ analysisData }: { analysisData: Record<string, ModelsIndicatorAnalysisData> | undefined }) {
    if (!analysisData) {
        return null;
    }

    const velocity = analysisData["SpeedPerIteration"];
    const rework = analysisData["ReworkPerIteration"];
    const instability = analysisData["InstabilityIndex"];

    return (
        <section className="space-y-5">

            <div className="grid gap-6 lg:grid-cols-2">
                {velocity && <IndicatorPanel analysisData={velocity} />}
                {rework && <IndicatorPanel analysisData={rework} />}
            </div>

            {instability && <IndicatorPanel analysisData={instability} />}

        </section>
    );
}

