import React, { useState,createContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const UserContext=createContext();

export const  UserProvider = ({children}) => {
  let [user,setUser]=useState(null);
 
  const navigate=useNavigate()
 
   const login =async (data)=>{
    try{

      const response= await axios.post("http://localhost:3002/login",data);
      if(response.data.user){
        setUser(response.data.user);
        console.log(user)
        
      }
     
        return {ok:true,user:response.data.user};
      
    }catch(error){
      console.error("login failed",error);
     
      return {sucess:false,error:error.response ? error.response.data:"Network error"}
    }
  }
  const logout=async()=>{
    try{
      const response=await axios.get('http://localhost:3002/logout');
      if(response.status===200){
        setUser(null);
        navigate('/')
        console.log("log out successfully");
      }
    }catch(error){
      console.error("error logging out",error)
    }
  }
  return (
    <UserContext.Provider value ={{user,login,logout}}>
      {children}
    </UserContext.Provider>
    
  )
}

