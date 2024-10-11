import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (name, price, uid) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState({ name: "", price: 0 });
  const [userId, setUserId] = useState(""); // State to store userId

  const handleOpenBuyWindow = (name, price, uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStock({ name, price });
    setUserId(uid); // Set userId when opening the buy window
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStock({ name: "", price: 0 });
    setUserId(""); // Reset userId when closing
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={userId} stockPrice={selectedStock.price} stockName={selectedStock.name} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
