import {  useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';




export const PrivateRoute = ({ children}) => {
    const { isAuthenticated } = useContext(AuthContext);
  const navigate=useNavigate();

 useEffect(()=>{
  if(!isAuthenticated){
    return navigate("/logIn");
  }
 },[isAuthenticated])
 return <>{children}</>
};