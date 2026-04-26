"use client";

import { Button } from "@/components/atoms/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/ui/form";
import { Textarea } from "@/components/atoms/ui/textarea";
import { ColorSelector } from "@/components/molecules/color-selector";
import { MembersSelect } from "@/components/molecules/members-select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormValues } from "./resolver";
import { projectAction } from "@/request/project/action";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store/store";
import { IndicatorRange } from "@/components/molecules/indicator-range";
import { ModelsIndicatorEnum } from "@/apis/data-contracts";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProjectForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [page, setPage] = useState<number>(0);
  const t = useTranslations("ProjectForm");

  const emptyRange = { min: "", max: "" };
  const emptyIndicatorRange = {
    ok: emptyRange,
    alert: emptyRange,
    critical: emptyRange,
  };

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      name: "",
      description: "",
      members: [],
      colorSelect: undefined,
      indicatorRanges: {
        SpeedPerIteration: { ...emptyIndicatorRange },
        ReworkPerIteration: { ...emptyIndicatorRange },
        InstabilityIndex: { ...emptyIndicatorRange },
      },
    },
    resolver: zodResolver(projectSchema),
    mode: "onChange",
  });

  const parseDecimal = (value: string | undefined): number => {
    if (!value) return 0;
    return parseFloat(value.replace(",", ".")) || 0;
  };

  const mutation = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      const indicatorRangesArray = data.indicatorRanges
        ? Object.entries(data.indicatorRanges).map(
            ([indicatorType, ranges]) => ({
              indicator_type: indicatorType,
              range: {
                ok: {
                  min: parseDecimal(ranges?.ok?.min),
                  max: parseDecimal(ranges?.ok?.max),
                },
                alert: {
                  min: parseDecimal(ranges?.alert?.min),
                  max: parseDecimal(ranges?.alert?.max),
                },
                critical: {
                  min: parseDecimal(ranges?.critical?.min),
                  max: parseDecimal(ranges?.critical?.max),
                },
              },
            }),
          )
        : [];

      const payload = {
        name: data.name,
        description: data.description,
        color: data.colorSelect,
        member_ids: data.members,
        indicator_ranges: indicatorRangesArray,
      };
      return await projectAction.create(payload);
    },
    onSuccess: async () => {
      form.reset();
      if (user?.id) {
        await queryClient.refetchQueries({
          queryKey: ["memberDetail", user.id],
        });
      }
      router.push("/projects");
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full"
      >
        {page === 0 && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel>{t("nameLabel")}</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      autoFocus
                      placeholder={t("namePlaceholder")}
                      maxLength={62}
                      className="border-none bg-transparent p-0 mt-2 min-h-2 min-w-100 text-3xl font-bold focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 shadow-none resize-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorSelect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-4">{t("colorLabel")}</FormLabel>
                  <ColorSelector
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-10">
                  <div className="flex items-center gap-3 mb-2">
                    <FormLabel htmlFor="description">
                      {t("descriptionLabel")}
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <Textarea
                    {...field}
                    placeholder={t("descriptionPlaceholder")}
                    className="min-h-20 resize-none overflow-hidden!"
                    id="description"
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <MembersSelect
                  value={field.value || []}
                  onChange={field.onChange}
                  label={t("membersLabel")}
                />
              )}
            />

            <div className="flex justify-center mt-10">
              <Button
                type="button"
                variant="default"
                className="w-40"
                onClick={() => setPage(1)}
              >
                <ArrowRight />
                {t("next")}
              </Button>
            </div>
          </div>
        )}

        {page === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-disabled">
                {t("rangesTitle")}
              </h3>
              <p className="text-sm text-disabled mb-4">
                {t("rangesSubtitle")}
              </p>

              <div className="grid grid-rows-3 gap-2">
                <IndicatorRange
                  indicatorType={ModelsIndicatorEnum.IndicatorSpeedPerIteration}
                />
                <IndicatorRange
                  indicatorType={
                    ModelsIndicatorEnum.IndicatorReworkPerIteration
                  }
                />
                <IndicatorRange
                  indicatorType={ModelsIndicatorEnum.IndicatorInstabilityIndex}
                />
              </div>
            </div>
            <div className="flex flex-rows gap-2 justify-center mt-4">
              <Button
                type="button"
                variant="default"
                className="w-40"
                onClick={() => setPage(0)}
              >
                <ArrowLeft />
                {t("back")}
              </Button>
              <Button
                type="submit"
                variant="default"
                className="w-40"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? t("creating") : t("create")}
              </Button>
            </div>
          </div>
        )}

        {mutation.isError && (
          <div className="mt-4 p-3 rounded-xl bg-red-100 border-2 border-red-500">
            <p className="text-sm text-red-700 font-semibold text-center">
              {t("error")}
            </p>
          </div>
        )}
      </form>
    </Form>
  );
}
