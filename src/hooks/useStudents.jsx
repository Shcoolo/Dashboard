import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteStudent, indexStudents, showStudent, storeStudent, updateStudent } from '../api/students';

// Fetch all studentes
export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: indexStudents,
    select: (data) => data?.data,
  });
};

// Fetch single student
export const useStudent = (id) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => showStudent(id),
    enabled: !!id,
    select: (data) => data?.data,
  });
};

// Add new student
export const useAddStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

// Update student
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateStudent(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['students', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

// Delete student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}) => deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};
