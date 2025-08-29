import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSection, indexSections, indexSectionsByClass, showSection, storeSection, updateSection } from '../api/sections';

// Fetch all sectiones
export const useSections = ({ classId = '', filter = ''}) => {
  return useQuery({
    queryKey: ['sections', classId, filter],
    queryFn: classId?()=>indexSectionsByClass(classId) : () => indexSections(filter),
    select: (data) => data?.data,
  });
};

// Fetch single section
export const useSection = (id) => {
  return useQuery({
    queryKey: ['section', id],
    queryFn: () => showSection(id),
    enabled: !!id,
    select: (data) => data?.data,
  });
};

// Add new section
export const useAddSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeSection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections'] });
    },
  });
};

// Update section
export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateSection(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sections', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['sections'] });
    },
  });
};

// Delete section
export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}) => deleteSection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sectiones'] });
    },
  });
};
