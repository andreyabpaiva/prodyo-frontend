"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CauseDialog } from "@/components/dashboard/modals";
import { ModelsIndicatorAnalysisData, ModelsProductivityEnum } from "@/apis/data-contracts";
import { ProductivityLevel } from "@/types/domain";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setCriticalMetricLabel } from "@/store/iterationSlice";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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
    const text = level === ModelsProductivityEnum.ProductivityCritical ? "CRÍTICO" :
        level === ModelsProductivityEnum.ProductivityAlert ? "ALERTA" :
            level === ModelsProductivityEnum.ProductivityOk ? "OK" : "INDEFINIDO";
    const tone =
        level ===
            ModelsProductivityEnum.ProductivityCritical ? "bg-[var(--critic)] text-[var(--dark)] border-[var(--dark)]" :
            level ===
                ModelsProductivityEnum.ProductivityAlert ? "bg-[var(--alert)] text-[var(--dark)] border-[var(--dark)]" :
                level === ModelsProductivityEnum.ProductivityOk ?
                    "bg-[var(--ok)] text-[var(--dark)] border-[var(--dark)]"
                    : "bg-[var(--divider)] text-[var(--dark)] border-[var(--dark)]";
    return (
        <Badge className={`rounded-full border-[3px] px-6 py-1 text-sm font-bold ${tone}`}>
            {text}
        </Badge>
    );
}

function LineChart({ values, color, labels }: { values: number[]; color: string; labels: string[] }) {
    const data = {
        labels: labels,
        datasets: [
            {
                data: values,
                borderColor: color,
                backgroundColor: `${color}33`,
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: color,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 12,
                titleFont: {
                    size: 14,
                    weight: "bold",
                },
                bodyFont: {
                    size: 13,
                },
                cornerRadius: 8,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#9ca3af",
                    font: {
                        size: 11,
                        weight: 600,
                    },
                },
            },
            y: {
                grid: {
                    color: "#e5e7eb33",
                },
                ticks: {
                    color: "#9ca3af",
                    font: {
                        size: 11,
                    },
                },
            },
        },
    };

    return (
        <div className="h-40 w-full">
            <Line data={data} options={options} />
        </div>
    );
}

function IndicatorPanel({ analysisData }: { analysisData: ModelsIndicatorAnalysisData }) {
    const copy = metricCopy[analysisData.indicatorType as keyof typeof metricCopy];
    const projectId = useSelector((state: RootState) => state.project.projectId);
    const dispatch = useDispatch();
    const router = useRouter();

    const yValues = analysisData.points?.map(point => point.y || 0) || [];
    const xLabels = analysisData.points?.map(point => point.x?.toString() || "") || [];
    const latestStatus = analysisData.points?.[analysisData.points.length - 1]?.status;

    const handleAddAction = () => {
        dispatch(setCriticalMetricLabel(copy.title));
        router.push(`/projects/${projectId}/indicators/create-action`);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 justify-end">

                <div className="flex items-center w-full justify-between gap-4">
                    <div>
                        <p className="text-md font-bold">{copy.title}</p>
                    </div>
                    <div className="flex items-center gap-4">

                        {latestStatus && latestStatus === ModelsProductivityEnum.ProductivityAlert ? (
                            <CauseDialog
                                level={convertProductivityLevel(latestStatus)}
                                metricLabel={copy.title}
                                trigger={
                                    <Button variant={"default"} size={"sm"}>
                                        + Adicionar causa
                                    </Button>
                                }
                            />
                        ) : latestStatus === ModelsProductivityEnum.ProductivityCritical ? (
                            <Button variant={"default"} size={"sm"} onClick={handleAddAction}>
                                + Adicionar ação
                            </Button>
                        ) : null}
                        <StatusBadge level={latestStatus} />
                    </div>
                </div>

            </div>
            <div className="flex flex-col gap-4 rounded-[32px] border-[3px] border-[--dark] bg-[var(--primary)] px-8 py-6">
                {analysisData.yAxis?.label && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold uppercase text-[var(--divider)]">{analysisData.yAxis.label}</p>
                    </div>
                )}
                <div>
                    <LineChart values={yValues} color={copy.color} labels={xLabels} />
                    {analysisData.xAxis?.label && (
                        <div className="mt-2 text-center text-sm font-bold uppercase text-[var(--divider)]">
                            <span>{analysisData.xAxis.label}</span>
                        </div>
                    )}
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

