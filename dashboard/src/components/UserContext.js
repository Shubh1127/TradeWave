import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // To store user info

  const fetchUserStatus = async () => {
    try {
      const response = await fetch('http://localhost:3002/currentUser', {
        method: 'GET',
        credentials: 'include', // Ensure credentials are included
      });

      if (response.ok) {
        const data = await response.json();
        if(data){
            console.log(data)
        }
        else{
            console.log('not fetching')
        }
        setIsLoggedIn(true);
        setUserInfo(data); // Assuming your API returns user data
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
    }
  };

  const login = async (userData) => {
    // Implement your login logic here (e.g., calling a login API)
    const response = await fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include credentials for cookie-based sessions
      body: JSON.stringify(userData), // Send user data for authentication
    });

    if (response.ok) {
      // Call fetchUserStatus to get current user info after successful login
      await fetchUserStatus();
    } else {
      console.error("Login failed:", response.status);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3002/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        setIsLoggedIn(false); // Update login status
        setUserInfo(null); // Clear user info
      } else {
        console.error("Logout failed with status:", response.status);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout, userInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
