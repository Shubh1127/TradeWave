import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from './UserContext'; // Adjust the path accordingly

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(UserContext); // Get login function from context

  const onSubmitHandler = async (data) => {
    const response = await fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    //   credentials: 'include', // Include credentials for the request
    });

    const result = await response.json();
    if (response.ok) {
      login(result.user); // Pass user data to login function
      window.location.href = "http://localhost:3000"; // Redirect after login
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className='container-fluid mt-5 p-5'>
      <div className='row '>
        <div className='col-6 p-5'> 
          <img className='mt-5 ms-5' src='https://signup.zerodha.com/img/landing.46a77378.png' style={{width:"100%"}}/>
        </div>
        <div className='col-1'></div>
        <div className='col-4 m-5'>
          <h2 className="ms-5">Welcome User!</h2>
          <form className="border border-3 rounded p-5 d-flex flex-column" style={{height:"50vh", width:"20rem"}} onSubmit={handleSubmit(onSubmitHandler)}>
            <label htmlFor="username" className="text-start ps-2 fw-bold">Username</label>
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
