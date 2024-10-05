import React from 'react'
function LeftSection({imageURL,productName,productDescription,tryDemo,learnMore,googlePlay,appStore}) {
    return (  
        <div className='container'>
            <div className='row  border-top  ms-5 '>
                <div className='col-6 p-3 mt-5 me-5 p-5'>
                    <img src={imageURL} />
                </div>
                
                <div className='col-4 ms-5 mt-5 p-5 '>
                    <h1 className='mt-5 mb-5 fs-2'>{productName}</h1>
                    <p>{productDescription}</p>
                    <div className='d-flex  gap-3 '>

                    <a href={tryDemo} style={{textDecoration:"none"}}>Try Demo <i class="fa-solid fa-arrow-right"></i></a>&nbsp;
                    <a href={learnMore} style={{textDecoration:"none"}}>Learn More <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div className='d-flex gap-3 mt-3'>
                    <a href={googlePlay}><img src="media/images/googlePlayBadge.svg"/></a>
                    <a href={appStore}><img src="media/images/appStoreBadge.svg"/></a>
                    </div>
                        
                </div>
            </div>
        </div>
    );
}

export default LeftSection;
