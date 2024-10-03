import React from 'react'

function Education() {
    return ( 
        <div className='container'>
            <div className='row   mx-5 mt-5 '>
                <div className='col-6'>
                    <img src='media/images/Education.svg' style={{width:"70%"}}></img>
                </div>
                <div className='col-6'>
                    <h1>Free and open market education</h1>
                    <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href='' className='mt-2'>Varsity <i class="fa-solid fa-arrow-right"></i></a>
                    <p className='mt-5'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href='' className='mt-2'>TradingQ&A <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>

        </div>
     );
}

export default Education;