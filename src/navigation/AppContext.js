import React from 'react';

export const AppContext = React.createContext({
  isLogedIn: false,
  user: {},
  setUser: () => {},
  setIsLogedIn: () => {}
});