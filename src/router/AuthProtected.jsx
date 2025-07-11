import React from 'react'
import { Navigate } from 'react-router-dom';


const AuthProtected = ({children}) => {
    let token = localStorage.getItem('token');
    return token?children:<Navigate to='/login' />
}

export default AuthProtected