import React, { useState,createContext,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const UserContext=createContext();

export const  UserProvider = ({children}) => {
  let [user,setUser]=useState(null);
  let [Message,setMessage]=useState("")
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
        setMessage("Login successful!");
        console.log(user)
        
      }
        return {ok:true,user:response.data.user,Message:"Login Successfull"};
      
    }catch(error){
      console.error("login failed",error);
      if(error.response){
        if(error.response.status===404){
          setMessage("Username does not match. Sign up")
        }else if(error.response.status===401){
          setMessage("Password not matched")
        }else{
          setMessage("An error occured.Please try again.")
        }
      }else{
        setMessage("Network Error.Please try again later.")
      }
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
      setMessage("Error logging out. Please try again."); 
    }
  }
  return (
    <UserContext.Provider value ={{user,login,logout}}>
      {children}
    </UserContext.Provider>
    
  )
}

