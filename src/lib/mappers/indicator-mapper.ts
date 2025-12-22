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

// Map API enum to domain type
const mapStatus = (apiStatus?: ModelsStatusEnum): "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" => {
    switch (apiStatus) {
        case ModelsStatusEnum.StatusNotStarted:
            return "NOT_STARTED";
        case ModelsStatusEnum.StatusInProgress:
            return "IN_PROGRESS";
        case ModelsStatusEnum.StatusCompleted:
            return "COMPLETED";
        default:
            return "NOT_STARTED";
    }
};

export const mapApiIndicatorToDomain = (apiIndicator: ModelsIndicator): Indicator => {
    // The API returns a single indicator with multiple metric values
    // For now, we'll map it to the WORK_VELOCITY metric
    // You may need to adjust this based on your actual API response structure
    const metric: MetricType = "WORK_VELOCITY";

    return {
        id: apiIndicator.id || "",
        iterationId: apiIndicator.iteration_id || "",
        metric,
        valueSeries: [
            apiIndicator.speed_value || 0,
            apiIndicator.rework_value || 0,
            apiIndicator.instability_value || 0
        ],
        labels: ["1", "2", "3"], // You may need to adjust this
        productivityLevel: mapProductivityLevel(apiIndicator.speed_level),
        causes: apiIndicator.causes?.map(mapApiCauseToDomain),
        actions: apiIndicator.actions?.map(mapApiActionToDomain),
    };
};

export const mapApiCauseToDomain = (apiCause: ModelsCause): Cause => {
    return {
        id: apiCause.id || "",
        indicatorId: apiCause.indicator_id || "",
        metric: mapMetricType(apiCause.metric),
        description: apiCause.description || "",
        productivityLevel: mapProductivityLevel(apiCause.productivity_level),
        assignee: {
            id: "",
            name: "Unassigned",
        },
        status: "NOT_STARTED",
    };
};

export const mapApiActionToDomain = (apiAction: ModelsAction): Action => {
    return {
        id: apiAction.id || "",
        indicatorId: apiAction.indicator_id || "",
        title: apiAction.description || "",
        description: apiAction.description || "",
        owner: {
            id: "",
            name: "Unassigned",
        },
        status: "NOT_STARTED",
        startDate: apiAction.created_at || new Date().toISOString(),
        endDate: apiAction.updated_at || new Date().toISOString(),
    };
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
