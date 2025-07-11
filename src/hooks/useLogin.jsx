import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
};
