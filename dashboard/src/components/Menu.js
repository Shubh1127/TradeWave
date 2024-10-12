import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from './UserContext'; // Adjust the import path as needed

const Menu = () => {
  const { isLoggedIn, logout } = useContext(UserContext); // Access login status and logout function
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      window.location.href = "http://localhost:3001"; // Redirect after logout
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container ">
      <img src="logo.png" style={{ width: "50px" }} alt="Logo" />
      <div className="menus d-flex align-items-center gap-3 justify-content-evenly">
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
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
        </ul>
        <div className="profile">
          {isLoggedIn ? (
             <Link to="/login">
             <button className="btn btn-primary rounded-1 p-1">
               Login
             </button>
           </Link>
          ) : (
            <button className="btn btn-primary rounded-1 p-1" onClick={handleLogout}>
              Logout
            </button>
           
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
