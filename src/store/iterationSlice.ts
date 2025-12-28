import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IterationState {
    activeIterationId: string | null;
    iterationNumber: number | null;
    activeGraphsId: string | null;
    criticalMetricLabel: string | null;
    activeIndicatorId: string | null;
}

const initialState: IterationState = {
    activeIterationId: null,
    iterationNumber: null,
    activeGraphsId: null,
    criticalMetricLabel: null,
    activeIndicatorId: null,
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
        setActiveIndicatorId: (state, action: PayloadAction<string | null>) => {
            state.activeIndicatorId = action.payload;
        }
    },
})

export const { clearActiveIterationId, setActiveIterationsId, setActiveGraphsId, setIterationNumber, setCriticalMetricLabel, setActiveIndicatorId } = iterationSlice.actions;
export default iterationSlice.reducer;