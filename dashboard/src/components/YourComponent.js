import React, { useContext } from 'react';
import { watchlist } from './data'; // Ensure you import your watchlist
import GeneralContext from './GeneralContext';
import UserContext from './UserContext'

const YourComponent = () => {
  const { openBuyWindow, openSellWindow, userId } = useContext(GeneralContext);
  const {user}=useContext(UserContext)

  const handleOpenBuyWindow = (stock) => {
   
    if (user) {
      openBuyWindow(stock.name, stock.price, user._id); // Pass user ID from UserContext
    } else {
      console.error("User not logged in");
      // Handle user not logged in (e.g., show a notification or redirect to login)
    } // Pass both stock name and price
  };

  const handleOpenSellWindow = (stock) => {
   
    if (user) {
      openSellWindow(stock.name, stock.price, user._id); // Pass user ID from UserContext
    } else {
      console.error("User not logged in");
      // Handle user not logged in (e.g., show a notification or redirect to login)
    } // Pass both stock name and price
  };


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
