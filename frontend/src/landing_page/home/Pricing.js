import React from 'react'

function Pricing() {
    return (  
        <div className='container'>
                <div className='row mb-5  mx-5 mt-5'>
                    <div className='col-4'>
                        <h1 className=' mb-5'>Unbeatable pricing</h1>
                        <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                        <a href=''>see pricing <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div className='col-2'></div>
                    <div className='col-6'>
                        <div className='row  m-3 text-center'>
                            <div className='col p-3 border'>
                                <h1 className='mb-3'>₹0</h1>
                                <p>Free account
                                opening</p>
                            </div>
                            <div className='col p-3 border'>
                                <h1 className='mb-3'>₹0</h1>
                                <p>Free equity delivery
                                and <br></br>direct mutual funds</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Pricing;