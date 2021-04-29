import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 

import MainScreenNavigation from './MainScreenNavigation';
import RealCurrencyDetailsNavigation from './RealCurrencyDetailsNavigation';
import CustomRouterDrawer from './CustomRouterDrawer';

import { GlobalStyles } from '../../shared/GlobalStyles';

function AfterLoginRouter({ navigation, route }) {
   const Drawer = createDrawerNavigator();
   console.log('AfterLoginRouter');

   return (
      <Drawer.Navigator
         drawerContent={(props) => <CustomRouterDrawer {...props} />}
      >
         <Drawer.Screen 
            name="MainScreenNavigation"
            component={MainScreenNavigation}
            options={{ 
               title: 'Home',
               drawerIcon: () => <MaterialIcons name='home' size={24} style={{height: 24, width: 24, color: GlobalStyles.textColor}}/>
            }}
            initialParams={{
               token: route.params.token,
            }}
         />

         <Drawer.Screen 
            name="RealCurrencyDetailsNavigation" 
            component={RealCurrencyDetailsNavigation}
            options={{ 
               title: 'App Currency',
               drawerIcon: () => <Fontisto name='money-symbol' size={24} style={{height: 24, width: 24, color: GlobalStyles.textColor}}/>
            }}
            initialParams={{
               token: route.params.token,
            }}
         />

      </Drawer.Navigator>
   );
}

export default AfterLoginRouter;