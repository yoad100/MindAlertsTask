import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAlertLabels, updateAlertLabels } from '../api/alertsApi';

export function useAlertLabels(alertId: string | undefined, initial: string[] = []) {
  const queryClient = useQueryClient();

  const { data: labels = initial } = useQuery<string[]>({
    queryKey: ['alertLabels', alertId],
    queryFn: () => (alertId ? fetchAlertLabels(alertId) : Promise.resolve(initial)),
    enabled: Boolean(alertId),
    initialData: initial,
  });

  const mutation = useMutation({
    mutationFn: (next: string[]) => (alertId ? updateAlertLabels(alertId, next) : Promise.resolve(next)),
    onMutate: async (next: string[]) => {
      if (!alertId) return { previous: undefined };

      await queryClient.cancelQueries({ queryKey: ['alertLabels', alertId] });

      const previous = queryClient.getQueryData<string[]>(['alertLabels', alertId]);

      queryClient.setQueryData<string[]>(['alertLabels', alertId], next);

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (!alertId) return;
      if (context?.previous) {
        queryClient.setQueryData(['alertLabels', alertId], context.previous);
      }
    },
    onSettled: () => {
      if (!alertId) return;
      queryClient.invalidateQueries({ queryKey: ['alertLabels', alertId] });
    },
  });

  const setLabels = (next: string[]) => {
    mutation.mutate(next);
  };

  return { labels, setLabels };
}
