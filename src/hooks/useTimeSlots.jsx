import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTimeSlot, indexTimeSlots, showTimeSlot, storeTimeSlot, updateTimeSlot } from '../api/timeSlots';

// Fetch all timeSlots
export const useTimeSlots = () => {
  return useQuery({
    queryKey: ['timeSlots'],
    queryFn: indexTimeSlots,
    select: (data) => data?.data,
  });
};

// Fetch single timeSlot
export const useTimeSlot = (id) => {
  return useQuery({
    queryKey: ['timeSlot', id],
    queryFn: () => showTimeSlot(id),
    enabled: !!id,
    select: (data) => data?.data,
  });
};

// Add new TimeSlot
export const useAddTimeSlot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeTimeSlot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] });
    },
  });
};

// Update TimeSlot
export const useUpdateTimeSlot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateTimeSlot(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['timeSlots', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] });
    },
  });
};

// Delete TimeSlot
export const useDeleteTimeSlot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}) => deleteTimeSlot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] });
    },
  });
};
