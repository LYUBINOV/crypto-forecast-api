import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginComponent from '../../screens/LoginComponents/LoginComponent';
import RegistrationComponent from '../../screens/LoginComponents/RegistrationComponent';
import ResetPasswordComponent from '../../screens/LoginComponents/ResetPasswordComponent';

import AfterLoginRouter from '../AfterLoginRouter/AfterLoginRouter';

function BeforeLoginRouter({ navigation, route }) {
   const Stack = createStackNavigator();

   return (
      <Stack.Navigator
         screenOptions={{ 
            headerShown: false
         }}
      >

         <Stack.Screen 
            name="LoginComponent" 
            component={LoginComponent}
         />

         <Stack.Screen 
            name="RegistrationComponent" 
            component={RegistrationComponent}
         />

         <Stack.Screen 
            name="ResetPasswordComponent" 
            component={ResetPasswordComponent}
         />

         <Stack.Screen 
            name="AfterLoginRouter" 
            component={AfterLoginRouter}
         />

      </Stack.Navigator>
   );
}

export default BeforeLoginRouter;