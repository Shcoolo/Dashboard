import LoginForm from './LoginForm';
// import logoBlue from '/public/assets/logo-blue.png'

import './LoginStyle.css';

const LoginPage = () => {
  return (

    <div className="login-page">
      <div className='login-form'>
        <img src="/public/assets/logo-blue.png" alt='logo' width='250px'/>
        <LoginForm /> 
      </div>
    </div>
    
  )
}

export default LoginPage