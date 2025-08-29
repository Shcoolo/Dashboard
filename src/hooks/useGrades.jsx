import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTotalAvarage } from '../api/grades';

// Fetch all Total Avaragep
export const useTotalAvarage = ({student = ''}) => {
  
  return useQuery({
    queryKey: ['total-avarage', student],
    queryFn: () => getTotalAvarage(student),
    select: (data) => data?.data,
  });
};
