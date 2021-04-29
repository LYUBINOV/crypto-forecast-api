import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import RealCurrencyDetailComponent from '../../screens/RealCurrencyDetailComponents/RealCurrencyDetailComponent';

import Header from '../../header/Header';

function RealCurrencyDetailsNavigation({ navigation, route }) {
   const Stack = createStackNavigator();

   return (
      <Stack.Navigator
         screenOptions={{ 
            headerTintColor: 'white',
            headerStyle: {
               backgroundColor: 'gray',
               height: 60
            }
         }}
      >
         <Stack.Screen 
            name="RealCurrencyDetailComponent" 
            component={RealCurrencyDetailComponent}
            options={{ 
               header: ({ navigation }) => <Header title="App currency" navigation={ navigation }/> 
            }}
            initialParams={{
               token: route.params.token,
               chooseRealCurrency: route.params.chooseRealCurrency
            }} 
         />
      </Stack.Navigator>
   );
}

export default RealCurrencyDetailsNavigation;