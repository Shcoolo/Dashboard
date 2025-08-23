import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAdminstrator, indexAdminstrators, showAdminstrator, storeAdminstrator, updateAdminstrator } from '../api/adminstrators';

// Fetch all Adminstrators
export const useAdminstrators = () => {
  return useQuery({
    queryKey: ['adminstrators'],
    queryFn: indexAdminstrators,
    select: (data) => data?.data,
  });
};

// Fetch single Adminstrator
export const useAdminstrator = (id) => {
  return useQuery({
    queryKey: ['adminstrator', id],
    queryFn: () => showAdminstrator(id),
    enabled: !!id,
    select: (data) => data?.data,
  });
};

// Add new Adminstrator
export const useAddAdminstrator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeAdminstrator(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminstrators'] });
    },
  });
};

// Update Adminstrator
export const useUpdateAdminstrator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateAdminstrator(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminstrators', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['adminstrators'] });
    },
  });
};

// Delete Adminstrator
export const useDeleteAdminstrator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}) => deleteAdminstrator(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminstrators'] });
    },
  });
};
