import React from 'react'
import { useNavigate } from 'react-router-dom';

function OpenAccount() {
    const navigate = useNavigate(); 
    const handleSignupClick = () => {
        navigate('/signup'); // Navigate to the signup page when the button is clicked
    };
    return (
        <div className='container p-5 mb-5 '>
        <div className='row text-center  p-3 '>
            
            <h1 className='mt-5'>Open a Tradwave account</h1>
            <p>Modern platforms and apps,₹0 investments, and flat ₹20 intraday and F&O trades.</p>
            <button className='p-2 btn btn-primary fs-5 mt-3' onClick={handleSignupClick} style={{width:"20%", margin:"0 auto"}}>Sign up for free</button>
        </div>
    </div>
     );
}

export default OpenAccount;