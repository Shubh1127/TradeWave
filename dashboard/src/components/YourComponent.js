import React, { useContext } from 'react';
import { watchlist } from './data'; // Ensure you import your watchlist
import GeneralContext from './GeneralContext';
import UserContext from './UserContext'

const YourComponent = () => {
  const { openBuyWindow, openSellWindow, userId } = useContext(GeneralContext);

  const handleOpenBuyWindow = (stock) => {
    openBuyWindow(stock.name, stock.price, userId); // Pass both stock name and price
  };

  const handleOpenSellWindow = (stock) => {
    openSellWindow(stock.name, stock.price, userId); // Pass both stock name and price
  };
  const {user}=useContext(UserContext)


  return (
    <div>
      {watchlist.map((stock) => {
        return (
          <div key={stock.name}>
            <span>{stock.name} - ₹{stock.price}</span>
            <button onClick={() => handleOpenBuyWindow(stock)}>Buy</button>
            <button onClick={() => handleOpenSellWindow(stock)}>Sell</button> {/* Button to open sell window */}
          </div>
        );
      })}
    </div>
  );
};

export default YourComponent;
