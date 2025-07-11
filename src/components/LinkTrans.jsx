import { Link } from 'react-router-dom'

const LinkTrans = ({to, text, textAlign}) => {
  return (
    <Link to={to} 
        style={{textDecoration: 'none', 
            textAlign: {textAlign},
            width: '100%'    
        }}>
        <p>{text}</p>
    </Link>
  )
}

export default LinkTrans