import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSchedule, indexSchedules, showSchedule, storeSchedule, updateSchedule } from '../api/schedules';

// Fetch all schedules
export const useSchedules = ({filter}) => {
  return useQuery({
    queryKey: ['schedules', filter],
    queryFn: () => indexSchedules(filter),
    select: (data) => data?.data,
  });
};

// Fetch single schedule
export const useSchedule = (id) => {
  return useQuery({
    queryKey: ['schedule', id],
    queryFn: () => showSchedule(id),
    enabled: !!id,
    select: (data) => data?.data,
  });
};

// Add new schedule
export const useAddSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
    onError: (e) => console.error(e)
  });
};

// Update schedule
export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateSchedule(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['schedules', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
    onError: (e) => console.error(e)
  });
};

// Delete schedule
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}) => deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};
