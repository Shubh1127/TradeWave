import React from 'react'
import Hero from './Hero';
import Table from '../Table/Table'
import OpenAccount from '../OpenAccount';
import Brokerage from './Brokerage';

function PricingPage() {
    return ( 
        <>
        <Hero/> 
        <Table/>
        <OpenAccount/>
         <Brokerage/>
        </> 
    );
}

export default PricingPage;