"use client";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CauseActionForm from '@/components/forms/action';

export default function CreateActionPage() {
    const metricLabel = useSelector((state: RootState) => state.iteration.criticalMetricLabel);
    const indicatorId = useSelector((state: RootState) => state.iteration.activeIndicatorRangeId);

    return <CauseActionForm metricLabel={metricLabel ?? ""} indicatorRangeId={indicatorId ?? ""} />;
}