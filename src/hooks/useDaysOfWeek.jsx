import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { indexDaysOfWeek, showDayOfWeek, updateDayOfWeek } from '../api/weekdays';


// Fetch all 
export const useDays = () => {
  return useQuery({
    queryKey: ['days'],
    queryFn: indexDaysOfWeek,
    select: (data) => data?.data,
  });
};

// Fetch single class
export const useShowDay = (id) => {
  return useQuery({
    queryKey: ['day', id],
    queryFn: () => showDayOfWeek(id),
    enabled: !!id,
    select: (data) => data?.data,
  });
};

// Update class
export const useUpdateDays = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDayOfWeek(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['day', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['days'] });
    },
  });
};

