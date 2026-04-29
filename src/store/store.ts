import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import taskReducer from "./taskSlice";
import iterationReducer from "./iterationSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      project: projectReducer,
      task: taskReducer,
      iteration: iterationReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

