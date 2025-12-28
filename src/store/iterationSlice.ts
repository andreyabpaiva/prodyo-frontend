import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IterationState {
    activeIterationId: string | null; 
    iterationNumber: number | null;
    activeGraphsId: string | null;    
}

const initialState: IterationState = {
    activeIterationId: null,
    iterationNumber: null,
    activeGraphsId: null,
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
        }
    },
})

export const { clearActiveIterationId, setActiveIterationsId, setActiveGraphsId, setIterationNumber } = iterationSlice.actions;
export default iterationSlice.reducer;