import React from 'react'
import { useNavigate } from 'react-router-dom';


function Hero() {
    const navigate = useNavigate(); 
    const handleSignupClick = () => {
        navigate('/signup'); // Navigate to the signup page when the button is clicked
    };

    return ( 
        <>
       
        <div className='container p-5 mb-5 '>
            <div className='row text-center  p-3 '>
                <img src='media/images/homeHero.png' style={{width:"70%"}} alt='shba' className=' mt-5 mb-5 mx-auto'/>
                <h1 className='mt-5'>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, and more</p>
                <button className='p-2 btn btn-primary fs-5 mt-3' onClick={handleSignupClick} style={{width:"20%", margin:"0 auto"}}>Signup now</button>
            </div>
        </div>
        </>
     );
}

export default Hero;