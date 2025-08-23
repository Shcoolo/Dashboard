import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSubject, indexSubjects, showSubject, storeSubject, updateSubject } from '../api/subjects';

// Fetch all subjects
export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: indexSubjects,
    select: (data) => data?.data,
  });
};

// Fetch single Subject
export const useSubject = (id) => {
  return useQuery({
    queryKey: ['subject', id],
    queryFn: () => showSubject(id),
    enabled: Number.isInteger(Number(id)),
    select: (data) => data?.data,
  });
};

// Add new Subject
export const useAddSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeSubject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};

// Update Subject
export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateSubject(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['subjects', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};

// Delete Subject
export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}) => deleteSubject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};
