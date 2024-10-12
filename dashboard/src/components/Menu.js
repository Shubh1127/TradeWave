import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };
  const handleLogut=async ()=>{
    try{

      const response=await fetch('http://localhost:3002/logout',{
        method:'GET',
        credentials: 'include',
      })
      const result =await response.json();
      if(response.ok){
        console.log("user logout",result)
        window.location.href = "http://localhost:3001"
      }else{
        console.log("logout failed")
      }
    }catch(err){
      console.error('Error:',err)
    }

  }

 

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container ">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus  d-flex align-items-center gap-3 justify-content-evenly">
        <ul className="mt-2 pt-3">
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          
        </ul>
        <div className="profile" >
              <button  className="btn btn-primary rounded-1 p-1 " onClick={handleLogut}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;