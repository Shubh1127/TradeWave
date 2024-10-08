import React from 'react'
import { Link } from 'react-router-dom'

function Orders() {
  return (
    <div>
      <div className=''>
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className=''btn>
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default Orders