"use client";

import CauseActionDialog from '@/components/dashboard/modal/CreateAction';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function CreateActionPage() {
    const metricLabel = useSelector((state: RootState) => state.iteration.criticalMetricLabel);
    const indicatorId = useSelector((state: RootState) => state.iteration.activeIndicatorId);

    return <CauseActionDialog metricLabel={metricLabel ?? ""} indicatorId={indicatorId ?? ""} />;
}