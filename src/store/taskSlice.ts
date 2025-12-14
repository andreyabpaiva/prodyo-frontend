import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TaskState {
    taskId: string | null;
}

const initialState: TaskState = {
    taskId: null,
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTaskId: (state, action: PayloadAction<string>) => {
            state.taskId = action.payload;
        },
        clearTaskId: (state) => {
            state.taskId = null;
        }
    }
})

export const { setTaskId, clearTaskId } = taskSlice.actions;
export default taskSlice.reducer;