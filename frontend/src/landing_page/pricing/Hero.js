import React from 'react'

function Hero() {
    return (
        <div className='container '>
          <div className='row  text-center mt-5 mb-5 '>
            <h1>Pricing</h1>
            <p className='text-muted'> Free equity and falt 20 traday and F&O trades</p>
          </div>
          <div className='row  text-center border-top p-5 '>
          <div className='col-4 p-5 '>
            <img src='media/images/pricingEquity.svg'/>
            <h4  className='fs-3'>Free equity delivery</h4>
            <p className=' text-muted'>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
          </div>
          
          <div className='col-4 p-5 '>
          <img src='media/images/intradayTrades.svg' />
            <h4 className='fs-3'>Intraday and F&O trades</h4>
            <p className='text-center text-muted'>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
          </div>
          <div className='col-4 p-5 '>
          <img src='media/images/pricingEquity.svg'/>
            <h1 className='fs-3'>Free direct MF</h1>
            <p className='text-muted'>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
          </div>
          </div>
        </div>
      );
}

export default Hero;