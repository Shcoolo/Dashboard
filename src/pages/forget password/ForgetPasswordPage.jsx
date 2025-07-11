import { Link } from "react-router-dom";
import { LinkTrans, LogoCard, OTPInput } from "../../components";
import ChangePassword from "./ChangePassword";
import SendOTP from './SendOTP';

const ForgetPassword = () => {
  return (
    <LogoCard width='335px'>
      <SendOTP />
      {/* <OTPInput /> */}

      <LinkTrans to="/login" text="Back to Login Page" textAlign="right" />
    </LogoCard>
  )
}

export default ForgetPassword;