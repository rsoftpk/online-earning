import React, { useState } from 'react';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './loginStack/LoginStack';
import Drawer from './Drawer';
import { AppContext } from './AppContext';

export default function () {
  const [isLogedIn, setIsLogedIn] = useState(true);
  const [user, setUser] = useState({
    "city": "Sukkur",
    "email": "rashid@gmail.com",
    "firstname": "Rashid",
    "id": "6",
    "lastname": "Rajper",
    "password": "0011",
    "phone": "031031030",
    "regDate": "2021-09-04 17:10:27",
    "uname": "rashidrajper",
    "urole": "Admin",
    "ustatus": "disable",
  });

  return (
    <AppContext.Provider value={{ isLogedIn, setIsLogedIn, user, setUser }} >
      <NavigationContainer>
        {!isLogedIn && (
          <LoginStack />
        )}
        {isLogedIn && (
          <Drawer />
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
}