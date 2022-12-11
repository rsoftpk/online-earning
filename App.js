import * as React from 'react';
import { themeInit } from './themeInit';
import Navigator from './src/navigation/Navigation';

themeInit();

export default function App() {
  return (
    <Navigator />
  );
}