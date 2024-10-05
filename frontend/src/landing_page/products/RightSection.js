import React from 'react'
function RightSection({imageURL,productName,productDescription,tryDemo}) {
    return ( 
        <div className='container'>
            <div className='row p-5'>
                <div className='col-3 ms-5  d-flex  justify-content-center flex-column'>
                    <h2>{productName}</h2>
                    <p>{productDescription}</p>
                    <a href={tryDemo} style={{textDecoration:"none"}}>Learn More <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className='col'></div>
                <div className='col-6'>
                    <img src={imageURL} />
                </div>
            </div>
        </div>
     );
}

export default RightSection;