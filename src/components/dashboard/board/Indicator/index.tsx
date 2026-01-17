"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ModelsIndicatorAnalysisData,
  ModelsProductivityEnum,
} from "@/apis/data-contracts";
import { ProductivityLevel } from "@/types/domain";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveIndicatorRangeId,
  setAlertMetricLabel,
  setCriticalMetricLabel,
} from "@/store/iterationSlice";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

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
  const text =
    level === ModelsProductivityEnum.ProductivityCritical
      ? "CRÍTICO"
      : level === ModelsProductivityEnum.ProductivityAlert
        ? "ALERTA"
        : level === ModelsProductivityEnum.ProductivityOk
          ? "OK"
          : "INDEFINIDO";
  const tone =
    level === ModelsProductivityEnum.ProductivityCritical
      ? "bg-[var(--critic)] text-[var(--dark)] border-[var(--dark)]"
      : level === ModelsProductivityEnum.ProductivityAlert
        ? "bg-[var(--alert)] text-[var(--dark)] border-[var(--dark)]"
        : level === ModelsProductivityEnum.ProductivityOk
          ? "bg-[var(--ok)] text-[var(--dark)] border-[var(--dark)]"
          : "bg-[var(--divider)] text-[var(--dark)] border-[var(--dark)]";
  return (
    <Badge
      className={`rounded-full border-[3px] px-6 py-1 text-sm font-bold ${tone}`}
    >
      {text}
    </Badge>
  );
}

function BarChart({
  values,
  color,
  labels,
  statuses,
}: {
  values: number[];
  color: string;
  labels: string[];
  statuses?: (string | undefined)[];
}) {
  const getBarColor = (status: string | undefined) => {
    if (status === "Critical") return "#FF5050";
    if (status === "Alert") return "#F3FF89";
    if (status === "Ok") return "#B9FF94";
    return color;
  };

  const data = {
    labels: labels.map((label) => {
      if (label === "EXPECTED") return "Esperado";
      if (label === "ACTUAL") return "Real";
      return label;
    }),
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((label, index) =>
          label === "EXPECTED"
            ? "#999999"
            : statuses && statuses[index]
              ? getBarColor(statuses[index])
              : color,
        ),
        borderColor: "var(--dark)",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
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
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return `Velocidade: ${value?.toFixed(2) ?? 0} %`;
          },
        },
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
            size: 12,
            weight: 600,
          },
        },
      },
      y: {
        beginAtZero: true,
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
      <Bar data={data} options={options} />
    </div>
  );
}

function LineChart({
  values,
  color,
  labels,
}: {
  values: number[];
  color: string;
  labels: string[];
}) {
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

  const options: ChartOptions<"line"> = {
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

function IndicatorPanel({
  analysisData,
}: {
  analysisData: ModelsIndicatorAnalysisData;
}) {
  const copy =
    metricCopy[analysisData.indicatorType as keyof typeof metricCopy];
  const projectId = useSelector((state: RootState) => state.project.projectId);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["indicatorRanges", projectId, analysisData.indicatorType],
    queryFn: () =>
      projectService.getIndicatorsIdByProjectId({
        projectId: projectId ?? "",
        indicatorType: analysisData.indicatorType ?? "",
      }),
    enabled: !!projectId,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
  });

  const handleSetIndicatorRangeId = () => {
    dispatch(setActiveIndicatorRangeId(data?.id || null));
  };

  const yValues = analysisData.points?.map((point) => point.y || 0) || [];
  const xLabels =
    analysisData.points?.map((point) => point.x?.toString() || "") || [];
  const statuses = analysisData.points?.map((point) => point.status) || [];

  const latestStatus =
    analysisData.points?.[analysisData.points.length - 1]?.status;
  const isSpeedPerIteration =
    analysisData.indicatorType === "SpeedPerIteration";

  const handleAddAction = () => {
    dispatch(setCriticalMetricLabel(copy.title));
    handleSetIndicatorRangeId();
    router.push(`/projects/${projectId}/indicators/create-action`);
  };

  const handleAddCause = () => {
    dispatch(setAlertMetricLabel(copy.title));
    handleSetIndicatorRangeId();
    router.push(`/projects/${projectId}/indicators/create-cause`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-end">
        <div className="flex items-center w-full gap-4">
          <div>
            <p className="text-md font-bold">{copy.title}</p>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge level={latestStatus} />
            {latestStatus &&
            latestStatus === ModelsProductivityEnum.ProductivityAlert ? (
              <Button variant={"default"} size={"sm"} onClick={handleAddCause}>
                Analisar causa
              </Button>
            ) : latestStatus === ModelsProductivityEnum.ProductivityCritical ? (
              <Button variant={"default"} size={"sm"} onClick={handleAddAction}>
                Analisar causa e ação
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-[32px] border-[3px] border-[--dark] bg-[var(--primary)] px-8 py-6">
        {analysisData.yAxis?.label && (
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold uppercase text-[var(--divider)]">
              {analysisData.yAxis.label}
            </p>
          </div>
        )}
        <div>
          {isSpeedPerIteration ? (
            <BarChart
              values={yValues}
              color={copy.color}
              labels={xLabels}
              statuses={statuses}
            />
          ) : (
            <LineChart values={yValues} color={copy.color} labels={xLabels} />
          )}
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

export function IndicatorBoard({
  analysisData,
}: {
  analysisData: Record<string, ModelsIndicatorAnalysisData> | undefined;
}) {
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
