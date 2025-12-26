import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IterationState {
    iterationId: string | null;
    activeIterationId: string | null; 
    activeGraphsId: string | null;    
}

const initialState: IterationState = {
    iterationId: null,
    activeIterationId: null,
    activeGraphsId: null,
}

const iterationSlice = createSlice({
    name: "iteration",
    initialState,
    reducers: {
        setIterationId: (state, action: PayloadAction<string>) => {
            state.iterationId = action.payload;
        },
        clearIterationId: (state) => {
            state.iterationId = null;
        },
        setActiveIterationsId: (state, action: PayloadAction<string | null>) => {
            state.activeIterationId = action.payload;
        },
        setActiveGraphsId: (state, action: PayloadAction<string | null>) => {
            state.activeGraphsId = action.payload;
        },
    },
})

export const { setIterationId, clearIterationId, setActiveIterationsId, setActiveGraphsId } = iterationSlice.actions;
export default iterationSlice.reducer;