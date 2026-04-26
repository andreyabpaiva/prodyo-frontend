"use client";

import { X } from "lucide-react";
import { Button } from "@/components/atoms/ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { iterationQuery } from "@/request/iteration/query";
import { iterationAction } from "@/request/iteration/action";
import { useTranslations } from "next-intl";

type DeleteIterationModalProps = {
  projectId: string;
  iterationId: string;
};

export default function DeleteIterationForm({
  projectId,
  iterationId,
}: DeleteIterationModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("DeleteIterationForm");

  const { data: iterations = [] } = useQuery({
    queryKey: ["iterations", projectId],
    queryFn: () => iterationQuery.list({ project_id: projectId }),
    enabled: !!projectId,
  });

  const iteration = iterations.find((iter) => iter.id === iterationId);
  const iterationLabel = iteration
    ? t("iterationLabel", { number: iteration.number || 0 })
    : t("thisIteration");

  const mutation = useMutation({
    mutationFn: async () => {
      return await iterationAction.delete({ id: iterationId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["iterations", projectId] });
      queryClient.invalidateQueries({ queryKey: ["projectDetail", projectId] });
      router.back();
    },
    onError: (error) => {
      console.error("Error deleting iteration:", error);
    },
  });

  const handleClose = () => {
    router.back();
  };

  const handleConfirm = () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-md rounded-[24px] border-[3px] border-dark bg-background p-8">
        <div className="mt-2 mb-6">
          <p className="text-lg">
            {t.rich("confirmText", {
              iteration: iterationLabel,
              strong: (chunks) => <strong key="strong">{chunks}</strong>,
            })}
          </p>
        </div>

        {mutation.isError && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 border-2 border-red-500">
            <p className="text-sm text-red-700 font-semibold">{t("error")}</p>
          </div>
        )}

        <div className="flex justify-center flex-col gap-3 max-w-md">
          <Button
            type="button"
            variant="default"
            onClick={handleConfirm}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? t("deleting") : t("confirm")}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={mutation.isPending}
          >
            {t("cancel")}
          </Button>
        </div>
      </div>
    </div>
  );
}
