import React, { useContext, useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from './SellActionWindow';
import { UserContext } from "./UserContext";

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
  
  const {user}=useContext(UserContext)
  console.log("general context user:",user)

  const handleOpenBuyWindow = (name, price, uid) => {
        if(user){
        setIsBuyWindowOpen(true);
        setSelectedStock({ name, price });
       
      }else{
        console.log("user not logged in")
      };
    }
      
  const handleOpenSellWindow = (name, price, uid) => {
    if(user){
    setIsSellWindowOpen(true);
    setSelectedStock({ name, price });
  }else{
    console.log("user not logged in")
  };
  }
  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStock({ name: "", price: 0 });
    
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStock({ name: "", price: 0 });
  
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
          uid={user._id} 
          stockPrice={selectedStock.price} 
          stockName={selectedStock.name} 
        />
      )}
      {isSellWindowOpen && (
        <SellActionWindow 
          uid={user._id}
          stockPrice={selectedStock.price} 
          stockName={selectedStock.name} 
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
