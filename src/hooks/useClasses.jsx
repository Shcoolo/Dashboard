import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteClass, indexClasses, showClass, storeClass, updateClass } from '../api/classes';

// Fetch all classes
export const useClasses = () => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: indexClasses,
    select: (data) => data?.data,
  });
};

// Fetch single class
export const useClass = (id) => {
  return useQuery({
    queryKey: ['class', id],
    queryFn: () => showClass(id),
    enabled: !!id,
    select: (data) => data?.data,
  });
};

// Add new class
export const useAddClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeClass(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });
};

// Update class
export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateClass(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classes', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });
};

// Delete class
export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}) => deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });
};
