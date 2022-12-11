import React from 'react';
// React Navigator
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import LoginScreen from '../../screens/login/loginScreen';
import SignUpScreen from '../../screens/signup/SignUpScreen';

const Stack = createStackNavigator();
const LoginStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Sign Up" component={SignUpScreen} />
  </Stack.Navigator>
);
export default LoginStack;