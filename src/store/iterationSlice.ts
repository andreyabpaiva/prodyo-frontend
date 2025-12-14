import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IterationState {
    iterationId: string | null;
}

const initialState: IterationState = {
    iterationId: null,
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
        }
    },
})

export const { setIterationId, clearIterationId } = iterationSlice.actions;
export default iterationSlice.reducer;