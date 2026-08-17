import { useQueryClient } from "@tanstack/react-query";
import { Button, toast } from "@/shared/ui";
import { copy } from "@/shared/i18n";
import { useReportHandover } from "@/shared/api/generated/endpoints";
import { leasingApplicationKeys } from "@/entities/leasing-application";

/** Owns the WRITE: report the bike handover, then refresh the list and this case. */
export function useReportHandoverAction(applicationId: string) {
  const queryClient = useQueryClient();
  return useReportHandover({
    mutation: {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: leasingApplicationKeys.all }),
          queryClient.invalidateQueries({ queryKey: leasingApplicationKeys.detail(applicationId) }),
        ]);
        toast.success(copy.actions.handoverSuccess);
      },
      onError: () => toast.error(copy.actions.error),
    },
  });
}

export function ReportHandoverButton({ applicationId }: { applicationId: string }) {
  const mutation = useReportHandoverAction(applicationId);
  return (
    <Button onClick={() => mutation.mutate({ applicationId })} disabled={mutation.isPending}>
      {mutation.isPending ? copy.actions.handoverPending : copy.actions.handover}
    </Button>
  );
}
