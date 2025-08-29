import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask, indexTasks, makeTaskDone, showTask, storeTask, updateTask } from '../api/tasks';

// Fetch all tasks
export const useTasks = ({subject}) => {
  return useQuery({
    queryKey: ['tasks', subject],
    queryFn: () => indexTasks({subject: subject}),
    select: (data) => data?.data,
  });
};

// Fetch single Task
export const useTask = (id) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => showTask(id),
    enabled: !!id,
    select: (data) => data?.data,
  });
};

// Add new task
export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}) => storeTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (e) => console.error(e)
  });
};

// Update Task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['task', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

// Delete Task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id}) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

// change exams to done
export const useTaskDone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => makeTaskDone(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['task', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
