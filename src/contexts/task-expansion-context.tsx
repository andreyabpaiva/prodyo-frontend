"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TaskExpansionContextType = {
  expandedTaskId: string | null;
  setExpandedTaskId: (taskId: string | null) => void;
  toggleTask: (taskId: string) => void;
};

const TaskExpansionContext = createContext<TaskExpansionContextType | undefined>(undefined);

export function TaskExpansionProvider({ children }: { children: ReactNode }) {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const toggleTask = (taskId: string) => {
    setExpandedTaskId((current) => (current === taskId ? null : taskId));
  };

  return (
    <TaskExpansionContext.Provider value={{ expandedTaskId, setExpandedTaskId, toggleTask }}>
      {children}
    </TaskExpansionContext.Provider>
  );
}

export function useTaskExpansion() {
  const context = useContext(TaskExpansionContext);
  if (context === undefined) {
    throw new Error("useTaskExpansion must be used within a TaskExpansionProvider");
  }
  return context;
}
