import React from 'react'
import {useForm} from "react-hook-form"
import {Link} from "react-router-dom"
// import {useNavigate} from "react-router-dom"

function Signup() {
    let {register,handleSubmit}=useForm();
    // let navigate=useNavigate();
    let onSubmitHandler=async(data)=>{
        // console.log(data)
        const response= await fetch("http://localhost:3002/signup",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const result =await response.json();

        if (response.ok) {
            console.log('User registered:', result);
            window.location.href = "http://localhost:3000";

        } else {
            console.error('Error:', result.message);
            alert(result.message); 
        }
    }
    let  onLogin= async()=>{
        const dashboard=window.location.href="http://localhost:3000";
        if(dashboard){
            console.log("redirected to dashboard")
        }
        else{
            console.log("problem in redirecting")
        }
        
    }
    return ( 
        <div className=' container'>
            <div className='row '>
                <div className='col-6 p-5 '> 
                    <img className='mt-5 ms-5 ' src='https://signup.zerodha.com/img/landing.46a77378.png' style={{width:"100%"}}/>
                </div>
                <div className='col-1'></div>
                <div className='col-4  m-5 '>
                    <h2 className='text-muted'>Signup now</h2>   
                    <div className='border border-3 rounded mx-auto'>
                    <form className="  p-5 d-flex flex-column" style={{width:"23rem"}} onSubmit={handleSubmit(onSubmitHandler)} >
                    <label htmlFor="email" className="text-start ps-2">Email</label>
                    <input className="m-2 p-1 rounded" type="email" id="email" placeholder="Email" {...register("email")} ></input>
                    <label htmlFor="username" className="text-start ps-2">Username</label>
                    <input className="m-2 p-1 rounded " type="text" placeholder="username" id="username" {...register("username")} ></input>
                    <label htmlFor="password" className="text-start ps-2">Password</label>
                    <input className="m-2 p-1 rounded " type="password" placeholder="Enter password" id="password" {...register("password")}></input>
                    <button className='btn btn-primary ms-5 mt-5' style={{width:"10rem"}} type="submit">Sign Up</button>
                    </form>
                    <p className=' ps-4 ' style={{marginLeft:"70px"}}>Already registered?<button onClick={onLogin} className=' text-primary border-0 bg-transparent  '>Login</button></p>
                    </div>
                   
                </div>
            </div>
        </div>
     );
}

export default Signup;