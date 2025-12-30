import type { ModelsIndicator, ModelsAction, ModelsCause } from "@/apis/data-contracts";
import type { Indicator, Action, Cause, MetricType, ProductivityLevel } from "@/types/domain";
import { ModelsStatusEnum, ModelsProductivityEnum, ModelsMetricEnum } from "@/apis/data-contracts";

// Map API enum to domain type
const mapMetricType = (apiMetric?: ModelsMetricEnum): MetricType => {
    switch (apiMetric) {
        case ModelsMetricEnum.MetricWorkVelocity:
            return "WORK_VELOCITY";
        case ModelsMetricEnum.MetricReworkIndex:
            return "REWORK_INDEX";
        case ModelsMetricEnum.MetricInstabilityIndex:
            return "INSTABILITY_INDEX";
        default:
            return "WORK_VELOCITY";
    }
};

// Map API enum to domain type
const mapProductivityLevel = (apiLevel?: ModelsProductivityEnum): ProductivityLevel => {
    switch (apiLevel) {
        case ModelsProductivityEnum.ProductivityOk:
            return "OK";
        case ModelsProductivityEnum.ProductivityAlert:
            return "ALERT";
        case ModelsProductivityEnum.ProductivityCritical:
            return "CRITICAL";
        default:
            return "OK";
    }
};
// Create multiple indicators from a single API indicator (one for each metric)
export const createIndicatorsFromApiIndicator = (apiIndicator: ModelsIndicator): Indicator[] => {
    const indicators: Indicator[] = [];

    if (apiIndicator.speed_value !== undefined) {
        indicators.push({
            id: apiIndicator.id || "",
            iterationId: apiIndicator.iteration_id || "",
            metric: "WORK_VELOCITY",
            valueSeries: [apiIndicator.speed_value],
            labels: ["Current"],
            productivityLevel: mapProductivityLevel(apiIndicator.speed_level),
        });
    }

    if (apiIndicator.rework_value !== undefined) {
        indicators.push({
            id: apiIndicator.id || "",
            iterationId: apiIndicator.iteration_id || "",
            metric: "REWORK_INDEX",
            valueSeries: [apiIndicator.rework_value],
            labels: ["Current"],
            productivityLevel: mapProductivityLevel(apiIndicator.rework_level),
        });
    }

    if (apiIndicator.instability_value !== undefined) {
        indicators.push({
            id: apiIndicator.id || "",
            iterationId: apiIndicator.iteration_id || "",
            metric: "INSTABILITY_INDEX",
            valueSeries: [apiIndicator.instability_value],
            labels: ["Current"],
            productivityLevel: mapProductivityLevel(apiIndicator.instability_level),
        });
    }

    return indicators;
};
