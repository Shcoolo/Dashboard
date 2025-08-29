import { ToastContainer } from 'react-toastify'
import { useTheme } from '@mui/material/styles';

const ToastNotificaton = () => {
  const theme = useTheme();
  const mode = theme.palette.mode || 'light';

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={mode}
      style={{ zIndex: 9999 , fontFamily: "Tajawal" }}
    />
  );
}

export default ToastNotificaton