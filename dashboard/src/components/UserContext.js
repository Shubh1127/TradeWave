import React, { useState,createContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const UserContext=createContext();

export const  UserProvider = ({children}) => {
  let [user,setUser]=useState(null);
  let [isLoggedin,setisLoggedIN]=useState(false);
  
  console.log(user)
 
  const navigate=useNavigate()

    // useEffect(()=>{
    //   const fetchUser=async()=>{
    //     try{
    //       const response=await axios.get("http://localhost:3002/login",{
    //         withCredentials:true,
    //       });
    //       if(response && response.data.user){
    //       }else{
    //         setUser(null)
    //       }
    //     }catch(err){
    //       console.error("error",err)
    //       setUser(null)
    //     }
    //   }
    //   fetchUser();
    // },[])




 
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

