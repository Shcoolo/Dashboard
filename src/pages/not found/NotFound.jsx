import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import './notfound-style.css';


const NotFound = () => {
  return (
    <div className='notfound-page'>
        <div className='notfound-card'>
            <h1>Not Found Page</h1>
            <p>This is page not found on this dashboard.</p>
            <Link to='/'><Button variant='contained'>Back to Home Page</Button></Link>
        </div>
    </div>
  )
}

export default NotFound