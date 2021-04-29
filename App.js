import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import BeforeLoginRouter from './routes/BeforeLoginRouter/BeforeLoginRouter';

export default function App() {
  return (
    <NavigationContainer>
      <BeforeLoginRouter/>
    </NavigationContainer>
  );
}