import { ToastContainer } from 'react-toastify'
import { themeSettings } from '../theme';

const ToastNotificaton = () => {

    const mode = themeSettings.mode??"light";

  return (
      <ToastContainer 
        position="top-right"    
        autoClose={5000}         
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode}
      />
  )
}

export default ToastNotificaton