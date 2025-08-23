import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { indexTerms, storeTerm, showTerm, updateTerm, deleteTerm } from '../api/terms';

// Fetch all terms for a specific year
export const useTerms = (yearId) => {
  return useQuery({
    queryKey: ['terms', yearId],
    queryFn: () => indexTerms(yearId),
    enabled: !!yearId,
    select: (data) => data?.data,
  });
};

// Fetch single term
export const useTerm = (yearId, termId) => {
  return useQuery({
    queryKey: ['term', yearId, termId],
    queryFn: () => showTerm(yearId, termId),
    enabled: !!yearId && !!termId,
    select: (data) => data?.data,
  });
};

// Add new term
export const useAddTerm = (yearId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeTerm(yearId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms', yearId] });
    },
  });
};

// Update term
export const useUpdateTerm = (yearId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ termId, data }) => updateTerm(yearId, termId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['term', yearId, variables.termId] });
      queryClient.invalidateQueries({ queryKey: ['terms', yearId] });
    },
  });
};

// Delete term
export const useDeleteTerm = (yearId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({termId}) => deleteTerm(yearId, termId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms', yearId] });
    },
  });
}; 