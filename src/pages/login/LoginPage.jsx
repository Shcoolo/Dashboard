import LoginForm from './LoginForm';

import './LoginStyle.css';

const LoginPage = () => {
  return (

    <div className="login-page">
      <div className='login-form'>
        <img src="../../../assets/logo-blue.png" alt='logo' width='300px'/>
        <LoginForm /> 
      
      </div>
    </div>
    
  )
}

export default LoginPage