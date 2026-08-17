import { useQueryClient } from "@tanstack/react-query";
import { Button, toast } from "@/shared/ui";
import { copy } from "@/shared/i18n";
import { useSignContract } from "@/shared/api/generated/endpoints";
import { leasingApplicationKeys } from "@/entities/leasing-application";

/** Owns the WRITE: sign the contract, then refresh the list and this case. */
export function useSignContractAction(applicationId: string) {
  const queryClient = useQueryClient();
  return useSignContract({
    mutation: {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: leasingApplicationKeys.all }),
          queryClient.invalidateQueries({ queryKey: leasingApplicationKeys.detail(applicationId) }),
        ]);
        toast.success(copy.actions.signSuccess);
      },
      onError: () => toast.error(copy.actions.error),
    },
  });
}

export function SignContractButton({ applicationId }: { applicationId: string }) {
  const mutation = useSignContractAction(applicationId);
  return (
    <Button onClick={() => mutation.mutate({ applicationId })} disabled={mutation.isPending}>
      {mutation.isPending ? copy.actions.signing : copy.actions.sign}
    </Button>
  );
}
