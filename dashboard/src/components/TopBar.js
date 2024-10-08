import React from 'react'
import Menu from "./Menu"
function TopBar() {
  return (
    <div className='topbar-container d-flex  align-items-center'>
        <div className='indices-container'>
          <div className='d-flex justify-content-between border-bottom border-end p-3' style={{width:"30rem"}}>
            <span className='d-flex'>
            <p className='  '>NIFTY 50</p>
                <p className='index-points ms-5'>{100.2}</p>
                <p className='percent'></p>
            </span>
            <span className='d-flex'>
            <p className='  me-5'>SENSEX</p>
                <p className='index-points ms-5'>{100.2}</p>
                <p className='percent'></p>
            </span>
          </div>
            
        </div>
        <Menu/>
    </div>
  )
}

export default TopBar;