import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IterationState {
    activeIterationId: string | null;
    iterationNumber: number | null;
    activeGraphsId: string | null;
    criticalMetricLabel: string | null;
    alertMetricLabel?: string | null;
    activeIndicatorRangeId: string | null;
}

const initialState: IterationState = {
    activeIterationId: null,
    iterationNumber: null,
    activeGraphsId: null,
    criticalMetricLabel: null,
    alertMetricLabel: null,
    activeIndicatorRangeId: null,
}

const iterationSlice = createSlice({
    name: "iteration",
    initialState,
    reducers: {
        clearActiveIterationId: (state) => {
            state.activeIterationId = null;
        },
        setActiveIterationsId: (state, action: PayloadAction<string | null>) => {
            state.activeIterationId = action.payload;
        },
        setActiveGraphsId: (state, action: PayloadAction<string | null>) => {
            state.activeGraphsId = action.payload;
        },
        setIterationNumber: (state, action: PayloadAction<number | null>) => {
            state.iterationNumber = action.payload;
        },
        setCriticalMetricLabel: (state, action: PayloadAction<string | null>) => {
            state.criticalMetricLabel = action.payload;
        },
        setAlertMetricLabel: (state, action: PayloadAction<string | null>) => {
            state.alertMetricLabel = action.payload;
        },
        setActiveIndicatorRangeId: (state, action: PayloadAction<string | null>) => {
            state.activeIndicatorRangeId = action.payload;
        }
    },
})

export const {
    clearActiveIterationId,
    setActiveIterationsId,
    setActiveGraphsId,
    setIterationNumber,
    setCriticalMetricLabel,
    setAlertMetricLabel,
    setActiveIndicatorRangeId
} = iterationSlice.actions;
export default iterationSlice.reducer;