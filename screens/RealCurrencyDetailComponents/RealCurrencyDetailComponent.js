import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';

import RealCurrencyDetailItemComponent from './RealCurrencyDetailItemComponent';
import { CommonActions } from '@react-navigation/native';
import { GlobalStyles, normalizeWidth, normalizeHeight } from '../../shared/GlobalStyles';
import { AdMobBanner } from 'expo-ads-admob';
import { GlobalAdsKeys } from '../../shared/GlobalAdsKeys';

export default function RealCurrencyDetailComponent({ navigation, route }) {
   const [realCurrencies, setRealCurrencies] = useState([
      { id: '1', code: 'EUR', name: 'Euro', /*logo: TODO*/ },
      { id: '2', code: 'USD', name: 'United States dollar', /*logo: TODO*/ },
      { id: '3', code: 'CHF', name: 'Swiss franc', /*logo: TODO*/ },
      { id: '4', code: 'CAD', name: 'Canadian dollar', /*logo: TODO*/ },
      { id: '5', code: 'JPY', name: 'Japanese yen', /*logo: TODO*/ },
   ]);

   const storeData = async (code) => {
      try {
         await AsyncStorage.setItem(
           'realCurrencyCode', code
         );
      } catch (error) {
         console.log(error);
      }
   };

   const handleOnPress = (code) => {
      storeData(code);
      console.log('RealCurrencyDetailComponent token', route.params.token);
      
      navigation.dispatch(
         CommonActions.reset({
            index: 0,
            routes: [{ 
               name: 'MainScreenNavigation',
               params: {
                  token: route.params.token,
               }
            }],
         })
      );
   }

   return (
      <View style={styles.container}>
         <View style={styles.currencyItems}>
            <Text style={styles.description}>
               Select your preferred currency to display in the app.
            </Text>
            <FlatList
               keyExtractor={(item) => item.id}
               data={realCurrencies}
               renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleOnPress(item.code)}>
                     <RealCurrencyDetailItemComponent name={item.name} code={item.code} />
                  </TouchableOpacity>
               )}
            />
            <View style={styles.adMobStyle}>
               <AdMobBanner
                  bannerSize="banner"
                  adUnitID={GlobalAdsKeys.bannerKey}
                  // setTestDeviceID1="EMULATOR"
                  onDidFailToReceiveAdWithError={(e) => console.log(e)}
               />
            </View>
         </View>
      </View>
   );
 }

const styles = StyleSheet.create({
   container: {
     flex: 1,
     flexDirection: 'column',
     alignItems: 'center',
   //   justifyContent:                'center',
     backgroundColor: GlobalStyles.backgroundColor
   },
   currencyItems: {
      marginTop: normalizeHeight(20),
      padding: normalizeWidth(20),
      flex: 1,
      justifyContent: 'center',   
   },
   description: {
      color: GlobalStyles.textColor,
      fontSize: normalizeWidth(16),
      margin: normalizeWidth(10),
   },
   adMobStyle: {
      alignItems: 'center'
   }
 });