import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeacher, indexTeachers, showTeacher, storeTeacher, updateTeacher } from '../api/teachers';

// Fetch all teachers
export const useTeachers = () => {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: indexTeachers,
    select: (data) => data?.data,
  });
};

// Fetch single Teacher
export const useTeacher = (id) => {
  return useQuery({
    queryKey: ['teacher', id],
    queryFn: () => showTeacher(id),
    enabled: !!id,
    select: (data) => data?.data,
  });
};

// Add new teacher
export const useAddTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },
  });
};

// Update Teacher
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateTeacher(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teachers', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },
  });
};

// Delete Teacher
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}) => deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },
  });
};
