import React, { useContext } from 'react';
import { watchlist } from './data'; // Ensure you import your watchlist
import GeneralContext from './GeneralContext';

const YourComponent = () => {
  const { openBuyWindow,userId } = useContext(GeneralContext);

  const handleOpenBuyWindow = (stock) => {
    openBuyWindow(stock.name, stock.price,userId); // Pass both stock name and price
  };

  {watchlist.map((stock) => {
   
    return (
        <div key={stock.name}>
            <span>{stock.name} - ₹{stock.price}</span>
            <button onClick={() => handleOpenBuyWindow(stock)}>Buy</button>
        </div>
    );
})}
};

export default YourComponent;
