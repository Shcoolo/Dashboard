import logo from '../../assets/imgs/logo-blue.png'
import './LogoCardStyle.css';


const LogoCard = ({children, width}) => {
  return (
    <div className="page">
      <div className='card' style={{ width: width}}>
        <img src={logo} alt='logo' width='300px'/>
          {children}
      </div>
    </div>
    
  )
}

export default LogoCard