import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';

import { GlobalStyles, normalizeWidth, normalizeHeight } from '../../shared/GlobalStyles';
import { GlobalConstants } from '../../shared/GlobalConstants';

export default function CustomRouterDrawer(props/*, { navigation }*/) {
   const signOutHandler = () => {
      let keysToRemove = [
         'userEmail', 
         'userPassword'
      ];

      AsyncStorage.multiRemove(keysToRemove, (err) => {
         console.log(err);
      });

      props.navigation.dispatch(
         CommonActions.reset({
            index: 0,
            routes: [{ 
               name: 'LoginComponent',
               params: { }
            }],
         })
      );
   }

   return (
      <SafeAreaView style={styles.saferAreaView}>
         
         <View style={styles.imageView}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
         </View>
         
         {/* <DrawerItems {...this.props}  activeTintColor='#2196f3' activeBackgroundColor='rgba(0, 0, 0, .04)' inactiveTintColor='rgba(0, 0, 0, .87)' inactiveBackgroundColor='transparent' style={{backgroundColor: '#000000'}} labelStyle={{color: '#ffffff'}}/> */}


         <DrawerContentScrollView>
            <DrawerItemList  
               {...props} 
               inactiveTintColor={GlobalStyles.textColor}
               activeTintColor={GlobalStyles.textColor}
               activeBackgroundColor={GlobalStyles.backgroundColor}
               style={{alignItems: 'center', justifyContent: 'center'}}
            />
         </DrawerContentScrollView>

         <View style={styles.signOutView}>
            <TouchableOpacity style={styles.signOutTouchableOpacity} onPress={() => signOutHandler(false) }>
               <Text style={{color: GlobalStyles.textColor}}>Sign Out</Text>
            </TouchableOpacity>
         </View>

      </SafeAreaView>
   );
 }

const styles = StyleSheet.create({
   imageView: {
      marginTop: normalizeHeight(30),
      alignItems: 'center',
      justifyContent: 'center'
   }, 
   logo: {
      width: normalizeWidth(230),
      height: normalizeWidth(230),
      resizeMode:'contain',
   },
   saferAreaView: {
     flex: 1,
     backgroundColor: GlobalStyles.cardColor,
   //   justifyContent: 'center',
   //   alignItems: 'center',
   },

   signOutTouchableOpacity: {
      backgroundColor: GlobalStyles.backgroundColor,
      borderRadius: GlobalConstants.borderRadius,
      paddingVertical: normalizeHeight(10),
      marginBottom: normalizeHeight(20),
      alignItems: 'center',
      width: normalizeWidth(200)
   },
   signOutView: {
      alignItems: 'center',
   }

 });


