import React from 'react'

function WatchList() {
  return (
    <div className='container'>
        
   <div className='border-bottom d-flex justify-content-between p-2'>
   <input className='border-0' type='text' name='search' id='search' placeholder='Search eg:infy,bse,nify fut weekly,gold mcx' />
    <span className='text-muted'>9/50</span>
   </div>
   <ul></ul>
    </div>
  )
}

export default WatchList