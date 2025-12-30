import { indicatorService } from "@/services";
import { ProductivityLevel } from "@/types/domain";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { X } from "lucide-react";
import { levelClasses } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserSelect } from "@/components/utils/UserSelect";
import { useRouter } from "next/navigation";
import { ModelsMetricEnum } from "@/apis/data-contracts";

const actionSchema = z.object({
    assigneeId: z.string().min(1, "Responsável é obrigatório"),
    startDate: z.string().min(1, "Data de início é obrigatória"),
    endDate: z.string().min(1, "Data de término é obrigatória"),
    description: z.string().min(1, "Descrição é obrigatória"),
    cause_description: z.string().min(1, "Descrição da causa é obrigatória"),
    metric: z.string().optional(),
});

type ActionFormValues = z.infer<typeof actionSchema>;

const formatDateInput = (value: string): string => {
    const numbers = value.replace(/\D/g, "");

    let formatted = "";
    if (numbers.length > 0) {
        formatted = numbers.slice(0, 2);
    }
    if (numbers.length > 2) {
        formatted += "/" + numbers.slice(2, 4);
    }
    if (numbers.length > 4) {
        formatted += "/" + numbers.slice(4, 6);
    }

    return formatted;
};

const formatDateToISO = (dateStr: string, isEndDate: boolean = false): string | undefined => {
    if (!dateStr || dateStr.length < 6) return undefined;

    const numbers = dateStr.replace(/\D/g, "");
    if (numbers.length < 6) return undefined;

    const day = numbers.slice(0, 2);
    const month = numbers.slice(2, 4);
    const year = numbers.slice(4, 6);

    const fullYear = `20${year}`;

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);

    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12) {
        return undefined;
    }

    const time = isEndDate ? "23:59:59" : "00:00:00";

    return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${time}-03:00`;
};

const mapMetricLabelToEnum = (label: string): ModelsMetricEnum | undefined => {
    const mapping: Record<string, ModelsMetricEnum> = {
        "VELOCIDADE": ModelsMetricEnum.MetricWorkVelocity,
        "ÍNDICE DE RETRABALHO": ModelsMetricEnum.MetricReworkIndex,
        "ÍNDICE DE INSTABILIDADE": ModelsMetricEnum.MetricInstabilityIndex,
    };
    return mapping[label];
};

export default function CauseActionForm({
    metricLabel,
    indicatorRangeId,
    level = "CRITICAL",
}: {
    metricLabel: string;
    indicatorRangeId: string;
    level?: ProductivityLevel;
}) {

    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    const form = useForm<ActionFormValues>({
        resolver: zodResolver(actionSchema),
        defaultValues: {
            assigneeId: "",
            startDate: "",
            endDate: "",
            description: "",
            cause_description: "",
        },
    })

    const onSubmit = async (data: ActionFormValues) => {
        try {
            const payload = {
                assignee_id: data.assigneeId,
                cause_description: data.cause_description,
                description: data.description,
                metric: mapMetricLabelToEnum(metricLabel),
                start_at: formatDateToISO(data.startDate, false),
                end_at: formatDateToISO(data.endDate, true),
                indicator_range_id: indicatorRangeId,
                status: "NotStarted"
            };
            await indicatorService.createAction(payload);
            router.back();
        }
        catch (error) {
            console.error("Error creating action and cause:", error);
            throw error;
        }
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={handleClose}
                />

                <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] border-[3px] border-[var(--dark)] bg-[var(--primary)] px-10 py-8">
                    <button
                        onClick={handleClose}
                        className="absolute right-6 top-6 text-[--dark] hover:opacity-70 transition-opacity cursor-pointer"
                    >
                        <X size={24} strokeWidth={2.5} />
                    </button>
                    <div className="flex items-center justify-between">
                        <UserSelect
                            value={form.watch("assigneeId")}
                            onChange={(value) => form.setValue("assigneeId", value)}
                        />
                    </div>

                    <section className="mt-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <p className="text-2xl font-bold">Causa</p>
                            <Badge className={`${levelClasses[level]} border-3 border-[var(--dark)] rounded-2xl px-3 py-1 text-xs font-bold text-[var(--text)]`}>
                                {level === "CRITICAL" ? "CRÍTICO" : level === "ALERT" ? "ALERTA" : "OK"}
                            </Badge>
                            <Badge className="border-[3px] bg-[var(--divider)] rounded-2xl border-[var(--dark)] px-4 py-1 text-xs font-bold">
                                NÃO INICIADO
                            </Badge>
                        </div>
                        <p className="text-xs font-semibold">
                            {metricLabel}
                        </p>
                        <Textarea
                            {...form.register("cause_description")}
                            placeholder="Descrição"
                            className="mt-2 h-24 rounded-2xl border-[3px] border-[var(--dark)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--dark)]"
                        />
                    </section>

                    <section className="mt-4 space-y-2">
                        <p className="text-2xl font-bold">Ação</p>
                        <p className="text-xs font-semibold">
                            {metricLabel}
                        </p>
                        <div className="inline-flex gap-2 rounded-full border-2 border-[var(--text)] px-4 py-2 w-auto">
                            <input
                                type="text"
                                placeholder="__/__/__"
                                {...form.register("startDate")}
                                onChange={(e) => {
                                    const formatted = formatDateInput(e.target.value);
                                    form.setValue("startDate", formatted);
                                }}
                                maxLength={8}
                                className="w-20 bg-transparent text-center font-semibold outline-none"
                            />
                            <span className="font-semibold">à</span>
                            <input
                                type="text"
                                placeholder="__/__/__"
                                {...form.register("endDate")}
                                onChange={(e) => {
                                    const formatted = formatDateInput(e.target.value);
                                    form.setValue("endDate", formatted);
                                }}
                                maxLength={8}
                                className="w-20 bg-transparent text-center font-semibold outline-none"
                            />
                        </div>
                        <Textarea
                            {...form.register("description")}
                            placeholder="Descrição"
                            className="mt-2 h-24 rounded-2xl border-[3px] border-[var(--dark)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--dark)]"
                        />
                        <div className="flex justify-end mt-5">
                            <Button
                                type="submit"
                                variant="default"
                            >
                                Criar ação
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}