import React from 'react'

function Menu() {
  return (
    <div className='d-flex justify-content-evenly flex-grow-1 p-3 border-bottom'>
      <div>
        <img src='https://seeklogo.com/images/Z/zerodha-kite-logo-89879A6A11-seeklogo.com.png' style={{width:"10%"}}/>
      </div>
      <p>Dashboard</p>
      <p>Orders</p>
      <p>Holdings</p>
      <p>Positions</p>
      <p>Funds</p>
      <p>Apps</p>
      <div className='d-flex '>
      <div className='bg-secondary d-flex justify-content-center align-items-center' style={{borderRadius:"50%",height:"2rem",width:"2rem"}}>ZU</div>
      <p className='pt-1 ps-1'>UserId</p>
      </div>
    </div>
  )
}

export default Menu