import LoginForm from './LoginForm';
import { LogoCard } from '../../components';
import './LoginStyle.css';

const LoginPage = () => {
  return (
    <LogoCard width='335px'>
      <LoginForm />
    </LogoCard>
  )
}

export default LoginPage