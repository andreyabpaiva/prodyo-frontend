import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  projectId: string | null;
}

const initialState: ProjectState = {
  projectId: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectId: (state, action: PayloadAction<string>) => {
      state.projectId = action.payload;
    },
    clearProjectId: (state) => {
      state.projectId = null;
    },
  },
});

export const { setProjectId, clearProjectId } = projectSlice.actions;
export default projectSlice.reducer;

