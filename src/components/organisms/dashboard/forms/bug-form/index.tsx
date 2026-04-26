"use client";

import { X, MoveDown } from "lucide-react";
import { Button } from "@/components/atoms/ui/button";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bugQuery } from "@/request/bug/query";
import { bugAction } from "@/request/bug/action";
import type { HandlersCreateBugRequest } from "@/apis/data-contracts";
import { UserSelect } from "@/components/molecules/user-select";
import { useTranslations } from "next-intl";

type CreateBugModalProps = {
  taskId: string;
};

export default function CreateBugForm({ taskId }: CreateBugModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("BugForm");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [assigneeId, setAssigneeId] = useState("");

  const { data: bugs = [] } = useQuery({
    queryKey: ["bugs", taskId],
    queryFn: () => {
      if (!taskId) {
        throw new Error("Task ID is required");
      }
      return bugQuery.list({ task_id: taskId });
    },
    enabled: !!taskId,
  });

  const nextBugNumber = useMemo(() => {
    if (!bugs || bugs.length === 0) {
      return 1;
    }
    const maxNumber = Math.max(...bugs.map((bug: any) => bug.number || 0));
    return maxNumber + 1;
  }, [bugs]);

  const mutation = useMutation({
    mutationFn: async () => {
      const payload: HandlersCreateBugRequest = {
        task_id: taskId,
        description: description || undefined,
        assignee_id: assigneeId || undefined,
        points: points || undefined,
        number: nextBugNumber,
      };

      return await bugAction.create(payload);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["bugs", taskId] });
      router.back();
    },
    onError: (error) => {
      console.error("Error creating bug:", error);
    },
  });

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] border-[3px] border-dark bg-primary px-10 py-8">
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 text-[--dark] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-3">
          <UserSelect
            value={assigneeId}
            onChange={(value) => setAssigneeId(value)}
          />
        </div>
        <div className="flex justify-end gap-1">
          <p className="text-xs text-divider">{t("scoreHint")}</p>
          <MoveDown
            color="var(--divider)"
            className="w-4 h-4 items-center justify-center"
          />
        </div>
        <div className="mt-6 flex items-center">
          <h1 className="flex-1 text-3xl font-bold">
            {t("title", { number: nextBugNumber })}
          </h1>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-critic border-[3px] border-dark text-sm font-bold text-primary">
            <input
              type="text"
              inputMode="numeric"
              value={points}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPoints(Number(value) || 0);
              }}
              className="w-6 bg-transparent text-center outline-none"
            />
          </div>
        </div>

        <textarea
          placeholder={t("descriptionPlaceholder")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-6 h-36 w-full rounded-[16px] border-[3px] border-dark bg-modal px-6 py-4 text-md text-dark outline-none resize-none"
        />

        {mutation.isError && (
          <div className="mt-4 p-3 rounded-xl bg-red-100 border-2 border-red-500">
            <p className="text-sm text-red-700 font-semibold text-center">
              {t("error")}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            variant="default"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? t("creating") : t("create")}
          </Button>
        </div>
      </div>
    </div>
  );
}
