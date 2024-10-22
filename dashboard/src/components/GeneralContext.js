import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from './SellActionWindow';

const GeneralContext = React.createContext({
  openBuyWindow: (name, price, uid) => {},
  openSellWindow: (name, price, uid) => {},
  closeSellWindow: () => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState({ name: "", price: 0 });
  const [userId, setUserId] = useState(""); // State to store userId

  const handleOpenBuyWindow = (name, price, uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStock({ name, price });
    setUserId(uid); // Set userId when opening the buy window
  };
  
  const handleOpenSellWindow = (name, price, uid) => {
    setIsSellWindowOpen(true);
    setSelectedStock({ name, price });
    setUserId(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStock({ name: "", price: 0 });
    setUserId(""); // Reset userId when closing
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStock({ name: "", price: 0 });
    setUserId("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow 
          uid={userId} 
          stockPrice={selectedStock.price} 
          stockName={selectedStock.name} 
        />
      )}
      {isSellWindowOpen && (
        <SellActionWindow 
          uid={userId} 
          stockPrice={selectedStock.price} 
          stockName={selectedStock.name} 
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
