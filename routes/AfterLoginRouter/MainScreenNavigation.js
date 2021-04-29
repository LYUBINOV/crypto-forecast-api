import React from 'react';

import { StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import CryptoCurenciesListComponent from '../../screens/MainScreenComponents/CryptoCurrenciesListComponents/CryptoCurrenciesListComponent';
import CryptoCurrencyViewComponent from '../../screens/MainScreenComponents/CryptoCurrencyViewComponents/CryptoCurrencyViewComponent';

import Header from '../../header/Header';

import { GlobalStyles } from '../../shared/GlobalStyles';

//definition of stack navigator, the first item is first pushed to the stack, other items are pushed variable
function MainScreenNavigation({ navigation, route }) {
   const Stack = createStackNavigator();

   console.log('MainScreenNavigation');

   return (
      <Stack.Navigator
         screenOptions={{ 
            headerTintColor: GlobalStyles.textColor,
            headerStyle: {
               backgroundColor: 'black',
               height: 60 + StatusBar.currentHeight
            }
         }}
      >

         <Stack.Screen 
            name="CryptoCurenciesListComponent" 
            component={CryptoCurenciesListComponent}
            options={{ 
               header: ({navigation, route}) => <Header title="Crypto currencies" navigation={ navigation } route={ route }/> 
            }}
            initialParams={{ 
               token: route.params.token,
            }}
         />

         <Stack.Screen 
            name="CryptoCurrencyViewComponent" 
            component={CryptoCurrencyViewComponent}
            options={{ 
               title: 'Predict',
               headerTintColor: GlobalStyles.textColor
            }} 
            initialParams={{ 
               token: route.params.token,
            }}
         />

      </Stack.Navigator>
   );
}

export default MainScreenNavigation;