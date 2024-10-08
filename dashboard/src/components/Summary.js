import React from 'react'

function Summary() {
  return (
    <>
      <div className=' mt-5 py-5 ps-4'>
        <h5>Hi, User!</h5>
        <hr ></hr>
      </div>
      <div className='section'>
        <span className=''>
          <h3 className=' py-4 ps-4 text-muted'>Equity</h3>
        </span>
        <div className='data d-flex justify-content-between border-bottom pb-5   '>
          <div className='  me-5 ps-4 '>
            <h2>3.74k</h2>
            <p className='text-muted' style={{fontSize:"0.87rem"}}>Margin available</p>
          </div>
          <div className=''></div>
          <div className='ms-5'>
            <p className='text-muted' style={{fontSize:"0.87rem"}}>
              Margins used <span>0</span>{" "}
            </p>
            <p className='text-muted' style={{fontSize:"0.87rem"}}>Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
          <div className='col-5'></div>
        </div>
      </div>
      <div className=' ps-3 text-muted'>
        <span>
          <h5 className='py-5'>Holdings (13)</h5>
        </span>
        <div className='d-flex justify-content-between border-bottom'>
          <div className='pb-5 ps-5'>
            <h3 className='text-success'>
              1.55k <small style={{fontSize:"0.7rem"}}>+5.20%</small>{" "}
            </h3>
            <p className='' style={{fontSize:"0.8rem",lineHeight:"0.1rem"}}>P&L</p>
          </div>
          <hr/>
          <div className='second'>
            <p style={{fontSize:"0.87rem"}}>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p style={{fontSize:"0.87rem"}}>
              Current Value <span>29.88k</span>{" "}
            </p>
          </div>
          <div className='col-5'></div>
        </div>
            </div>
    </>
  )
}

export default Summary