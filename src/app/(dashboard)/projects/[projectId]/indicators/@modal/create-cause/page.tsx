"use client";
import { CreateCauseForm } from "@/components/forms/cause";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function CreateCausePage() {

    const indicatorId = useSelector((state: RootState) => state.iteration.activeIndicatorRangeId);
    const metricLabel = useSelector((state: RootState) => state.iteration.alertMetricLabel);
    
    return (
        <CreateCauseForm metricLabel={metricLabel ?? ""} indicatorRangeId={indicatorId ?? ""} />
    )
}