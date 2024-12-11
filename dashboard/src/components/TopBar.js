import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import Menu from "./Menu";

const TopBar = () => {
  const {user,logout} = useContext(UserContext);
  return (
    <div className="topbar-container">
      <div className="indices-container d-flex flex-column">
        <div><h5 className="text-primary">Tradewave </h5></div>
        <div><h3 className="text-primary"> Dashboard</h3></div>
      </div>

      
        <Menu user={user} logout={logout}/>
      
    </div>
  );
};

export default TopBar;