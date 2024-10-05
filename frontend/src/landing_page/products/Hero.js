import React from 'react'
function Hero() {
    return ( 
            <div className='container  text-center mt-5 text-muted lh-lg mb-5 '>
                    <div className='row  '>
                        <h1 className='mt-4'>Technology</h1>
                        <h3 className='mt-3 fs-5'>Sleek, modern, and intuitive trading platforms</h3>
                        <p className='mt-3'> Check out our 
                        <a href="" className="me-5" style={{textDecoration:"none"}}> investments offerings<i class="fa-solid fa-arrow-right"></i>  </a>
                        </p>
                    </div>
               
            </div>

     );
}

export default Hero;