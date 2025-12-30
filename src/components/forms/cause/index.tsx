import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ProductivityLevel } from "@/types/domain";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import z, { map } from "zod";
import CauseActionForm from "../action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ModelsMetricEnum } from "@/apis/data-contracts";
import { indicatorService } from "@/services/indicator";
import { Button } from "@/components/ui/button";

const causeSchema = z.object({
    description: z.string().min(1, "Descrição é obrigatória"),
    indicatorRangeId: z.string().optional(),
    metric: z.string().optional(),
    productivityLevel: z.string().optional(),
});

const mapMetricLabelToEnum = (label: string): ModelsMetricEnum | undefined => {
    const mapping: Record<string, ModelsMetricEnum> = {
        "VELOCIDADE": ModelsMetricEnum.MetricWorkVelocity,
        "ÍNDICE DE RETRABALHO": ModelsMetricEnum.MetricReworkIndex,
        "ÍNDICE DE INSTABILIDADE": ModelsMetricEnum.MetricInstabilityIndex,
    };
    return mapping[label];
};

type CauseFormValues = z.infer<typeof causeSchema>;

export function CreateCauseForm({
    metricLabel,
    level = "ALERT",
    title = "Causa",
    indicatorRangeId
}: {
    level?: ProductivityLevel;
    metricLabel: string;
    title?: string;
    indicatorRangeId: string;
}) {

    const router = useRouter();
    const handleClose = () => {
        router.back();
    }

    const form = useForm<CauseFormValues>({
        resolver: zodResolver(causeSchema),
        defaultValues: {
            metric: "",
            productivityLevel: "",
            indicatorRangeId: indicatorRangeId,
            description: "",
        },
    })

    const onSubmit = async (data: CauseFormValues) => {
        try {
            const payload = {
                indicator_range_id: indicatorRangeId,
                description: data.description,
                metric: mapMetricLabelToEnum(metricLabel),
                productivity_level: "Alert" as ProductivityLevel
            };

            await indicatorService.createCause(payload);
            router.back();
        } catch (error) {
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
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <Badge className={`bg-[var(--alert)] border-3 border-[var(--dark)] rounded-2xl px-3 py-1 text-xs font-bold text-[var(--text)]`}>
                            ALERTA
                        </Badge>
                    </div>

                    <section className="mt-6 space-y-4">

                        <p className="text-sm font-semibold uppercase">
                            {metricLabel}
                        </p>
                        <Textarea
                            placeholder="Descrição"
                            className="mt-2 h-50 rounded-2xl border-[3px] border-[var(--dark)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--dark)]"
                            {...form.register("description")}
                        />
                        <div className="flex justify-end mt-5">
                            <Button variant={"default"} type="submit">
                                Criar causa
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}