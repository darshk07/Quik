import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define types for user data
export interface UserData {
  id: string;
  email: string;
  password: string;
  // Add any other properties you need
}

// Define the shape of the context value
export interface UserContextValue {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
  isLoggedIn: boolean | null;
}

// Create a context for the user state
export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

// Custom hook to use the user context

// Provider component to wrap your application
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Function to handle user login
  const login = (userData: UserData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const contextValue: UserContextValue = {
    user,
    login,
    logout,
    isLoggedIn,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
