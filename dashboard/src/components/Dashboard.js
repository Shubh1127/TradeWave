import React from 'react'
import WatchList from "./WatchList"
import Orders from "./Orders"
import Summary from "./Summary"
import Holdings from "./Holdings"
import Positions from "./Positions"
import Funds from "./Funds"
import Apps from "./App"
import { Route, Routes } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className='dashboard-container d-flex '>
      <div className='border-end' style={{width:"30rem"}}>
      <WatchList/>
      </div>
      <div className=' flex-grow-1'>
        <Routes>
        <Route exact path='/' element={<Summary/>}/>
        <Route exact path='/orders' element={<Orders/>}/>
        <Route exact path='/holdings' element={<Holdings/>}/>
        <Route exact path='/positions' element={<Positions/>}/>
        <Route exact path='/funds' element={<Funds/>}/>
        <Route exact path='/apps' element={<Apps/>}/>
        </Routes>
      </div>
      </div>
  )
}

export default Dashboard