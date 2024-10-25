import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from './UserContext'; 
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const { register, handleSubmit } = useForm();
  const {login,message} =useContext(UserContext)
  const navigate=useNavigate();
  
 

  const onSubmit= async(data)=>{
    console.log(message)
      const response= await login(data)
      if(response.ok){
        console.log("logged in");
        navigate('/')

      }else{
        console.log("failed to logged in")
      }
      // console.log(data)
  }

  
  
  

  return (
    <div className='container-fluid mt-5 p-5'>
      <div className='row '>
        <div className='col-6 p-5'> 
          <img className='mt-5 ms-5' src='https://signup.zerodha.com/img/landing.46a77378.png' style={{width:"100%"}}/>
        </div>
        <div className='col-1'></div>
        <div className='col-4 m-5'>
          <h2 className="ms-5">Welcome User!</h2>
          <form className="border border-3 rounded p-5 d-flex flex-column" style={{height:"50vh", width:"20rem"}} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username" className="text-start ps-2 fw-bold">Username</label>
            {message && <p>{message}</p>}
            <input className="m-2 p-1 rounded" type="text" placeholder="username" id="username" {...register("username")} />
            <label htmlFor="password" className="text-start ps-2 fw-bold">Password</label>
            <input className="m-2 p-1 rounded" type="password" placeholder="Enter password" id="password" {...register("password")} />
            <button className="btn btn-primary ms-4   mt-5 rounded-3" style={{width:"10rem"}} type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
