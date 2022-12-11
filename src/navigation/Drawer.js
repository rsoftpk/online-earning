import * as React from 'react';
// React Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
// Screens
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DepositScreen from '../screens/deposit/DepositScreen';
import WithdrawScreen from '../screens/withdraw/WithdrawScreen';
import Profile from '../screens/profile/Profile';

const Drawer = createDrawerNavigator();
export default function () {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />        
      <Drawer.Screen name="Deposit" component={DepositScreen} />        
      <Drawer.Screen name="Withdraw" component={WithdrawScreen} />        
      <Drawer.Screen name="Profile" component={Profile} />        
    </Drawer.Navigator>      
  );
}