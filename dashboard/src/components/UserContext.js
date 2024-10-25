import React, { useState,createContext,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const UserContext=createContext();

export const  UserProvider = ({children}) => {
  let [user,setUser]=useState(null);
  const [usernameError, setUsernameError] = useState(''); // State for username error messages
  const [passwordError, setPasswordError] = useState('');
  // console.log("before login",user)
 
  const navigate=useNavigate()

   


    useEffect(() => {
      // Retrieve user info from local storage on component mount
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);

 
   const login =async (data)=>{
    try{

      const response= await axios.post("http://localhost:3002/login",data);
      if(response.data.user){
        setUser(response.data.user);
        localStorage.setItem('user',JSON.stringify(response.data.user)) 
        setUsernameError(''); // Clear username error
        setPasswordError('');
        return { ok: true, user: response.data.user };
      }else {
        // Check specific messages and set appropriate error states
        if (response.data.message==='Username does not match') {
          setUsernameError(response.data.message);
        } else if (response.data.message === 'Password not matched') {
          setPasswordError(response.data.message);
        }
        return { success: false, message: response.data.message };
      }
    }catch(error){
      console.error("login failed",error);
      const message = error.response ? error.response.data.message : "Network error";
      setPasswordError(message);
      return { success: false, message };
    }
  }
  const logout=async()=>{
    try{
      const response=await axios.get('http://localhost:3002/logout');
      if(response.status===200){
        setUser(null);
        navigate('/')
        console.log("log out successfully");
        localStorage.removeItem('user'); 
      }
    }catch(error){
      console.error("error logging out",error)
    }
  }
  return (
    <UserContext.Provider value ={{user,login,logout,usernameError, passwordError}}>
      {children}
    </UserContext.Provider>
    
  )
}

