import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { indexYears, storeYear, showYear, updateYear, deleteYear } from '../api/years';

// Fetch all years
export const useYears = () => {
  return useQuery({
    queryKey: ['years'],
    queryFn: indexYears,
    select: (data) => data?.data,
  });
};

// Fetch single year
export const useYear = (id) => {
  return useQuery({
    queryKey: ['year', id],
    queryFn: () => showYear(id),
    enabled: !!id,
    select: (data) => data?.data,
  });
};

// Add new year
export const useAddYear = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeYear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['years'] });
    },
  });
};

// Update year
export const useUpdateYear = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateYear(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['year', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['years'] });
    },
  });
};

// Delete year
export const useDeleteYear = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}) => deleteYear(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['years'] });
    },
  });
};
