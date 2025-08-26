import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSchoolInfo, updateSchoolInfo } from "../api/schoolProfile";


// get profile
export const useGetSchoolInfo = () => {
  return useQuery({
    queryKey: ['shcool-info'],
    queryFn: getSchoolInfo,
    select: (data) => data?.data,
  });
};

// Update profile
export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }) => updateSchoolInfo(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['school-info'] });
    },
  });
};