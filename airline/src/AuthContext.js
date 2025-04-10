// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   const logout = () => {
//     setIsLoggedIn(false);
//     setIsAdmin(false);
//     setLoggedInUser(null); // Clear loggedInUser on logout
//     localStorage.clear(); // Clear any stored data
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, loggedInUser, setLoggedInUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize state from localStorage if available
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true" || false;
  });
  const [isAdmin, setIsAdmin] = useState(false); // Admin status not persisted for simplicity
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("loggedInUser", loggedInUser ? JSON.stringify(loggedInUser) : null);
  }, [isLoggedIn, loggedInUser]);

  const login = (userData, admin = false) => {
    setIsLoggedIn(true);
    setIsAdmin(admin);
    setLoggedInUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setLoggedInUser(null);
    localStorage.removeItem("isLoggedIn"); // Clear specific keys instead of all
    localStorage.removeItem("loggedInUser");
    // Note: Not clearing all localStorage to preserve unrelated data (e.g., bookings)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, loggedInUser, setLoggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);