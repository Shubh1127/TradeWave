import React, { useContext } from "react";
import { UserContext, UserProvider } from "./UserContext";
import Menu from "./Menu";

const TopBar = () => {
  const user = useContext(UserContext);
  const logout = useContext(UserContext)
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      <UserContext.Provider value ={{user,logout}}>
        <Menu />
      </UserContext.Provider>
    </div>
  );
};

export default TopBar;