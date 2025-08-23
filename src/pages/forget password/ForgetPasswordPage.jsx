import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkTrans, LogoCard, OTPInput } from "../../components";
import SendOTP from './SendOTP';
import ChangePassword from "./ChangePassword";
import { useState } from "react";

const ForgetPassword = () => {

  const [order, setOrder] = useState(1);
  const [phone, setPhone] = useState();

  const location = useLocation();
  const lastPart = location.pathname.split("/").pop();
  
   const purpose = lastPart === "confirm-account"?"phone_verification":"password_reset";

  return (
    <LogoCard width={order===2?'400px':'335px'}>

      { (order === 1) && <SendOTP setOrder={setOrder} setPhone={setPhone} />        }
      { (order === 2) && <OTPInput setOrder={setOrder}  phone_number={phone} purpose={purpose}/>       }
      { (order === 3) && <ChangePassword setOrder={setOrder} phone_number={phone}  /> }

      <LinkTrans to="/login" text="Back to Login Page" textAlign="right" />
    </LogoCard>
  )
}

export default ForgetPassword;