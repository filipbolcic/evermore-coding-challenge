import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createEvent, getEvents } from '../../api/events';
import { QUERY_KEYS } from './keys';

export function useEventsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.events.all,
    queryFn: getEvents,
  });
}

export function useCreateEventMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events.all });
    },
  });
}
