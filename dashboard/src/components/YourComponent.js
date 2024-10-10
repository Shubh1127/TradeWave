import React, { useContext } from 'react';
import { watchlist } from './data'; // Ensure you import your watchlist
import GeneralContext from './GeneralContext';

const YourComponent = () => {
  const { openBuyWindow } = useContext(GeneralContext);

  const handleOpenBuyWindow = (stock) => {
    openBuyWindow(stock.name, stock.price); // Pass both stock name and price
  };

  return (
    <div>
      {watchlist.map((stock) => (
        <div key={stock.name}>
          <span>{stock.name} - ₹{stock.price}</span>
          <button onClick={() => handleOpenBuyWindow(stock)}>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default YourComponent;
