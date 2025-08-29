import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { indexAttendance, indexAttendanceSummary, storeManyAttendance } from '../api/attendance';

// Fetch all Attendaces
export const useAttendances = ({student = '', date = ''}) => {
  return useQuery({
    queryKey: ['Attendances', student, date],
    queryFn: () => indexAttendance({student, date}),
    select: (data) => data?.data,
  });
};

// summary attendances
export const useAttendanceSummary = ({ student = ''}) => {
  return useQuery({
    queryKey: ['AttendancesSummary', student],
    queryFn: () => indexAttendanceSummary({student}),
    select: (data) => data?.data,
  });
};

// store many attendances 
export const useStoreAttendances = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({section, date, payload }) => storeManyAttendance({ section, date, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      console.log("Attendances stored successfully");
    },
    onError: (e) => { console.error(e)}
  });
};
