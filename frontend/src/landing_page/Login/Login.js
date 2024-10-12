
import { useForm } from "react-hook-form";

export default function Login(){
    let {register,handleSubmit,formState}=useForm();


    let  onSubmitHandler= async(data)=>{
        const response=await fetch('http://localhost:3002/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
            
        })
        
        const result=await response.json()
       if(response.ok){
            window.location.href = "http://localhost:3000";
           console.log(result)
       }
        else{
            console.error("login failed")
        }
    }

    return (
        <div className=' container'>
            <div className='row '>
            
                <div className='col-6 p-5 '> 
                    <img className='mt-5 ms-5 ' src='https://signup.zerodha.com/img/landing.46a77378.png' style={{width:"100%"}}/>
                </div>
                <div className='col-1'></div>
                <div className='col-4  m-5  '>
                     <h2 className="ms-5">Welcome User!</h2>
                    <form className=" border border-3 rounded p-5 d-flex flex-column" style={{height:"50vh",width:"20rem"}} onSubmit={handleSubmit(onSubmitHandler)} >
                    <label htmlFor="username" className="text-start ps-2 fw-bold">Username</label>
                <input className="m-2 p-1 rounded " type="text" placeholder="username" id="username" {...register("username")}></input>
                <label htmlFor="password" className="text-start ps-2 fw-bold">Password</label>
                <input className="m-2 p-1 rounded " type="password" placeholder="Enter password" id="password" {...register("password")}></input>
                <button className="btn btn-primary ms-4 mt-5" style={{width:"10rem"}} type="submit" >Login</button>
                    </form>
                   
                </div>
            </div>
        </div>
    )
}