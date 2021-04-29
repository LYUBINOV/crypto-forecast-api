import React, { useState, useEffect } from 'react';
import { 
   StyleSheet, 
   Text, 
   View, 
   FlatList, 
   TouchableOpacity, 
   AsyncStorage,
   StatusBar,
} from 'react-native';

import CryptoCurrenciesListItemComponent from '../CryptoCurrenciesListComponents/CryptoCurrenciesListItemComponent';

import { BarIndicator } from 'react-native-indicators';

import { GlobalStyles, normalizeWidth, normalizeHeight } from '../../../shared/GlobalStyles';

import { CryptoCurrencies } from '../../../static_datas/crypto_currencies';

import { AdMobBanner } from 'expo-ads-admob';

import { GlobalAdsKeys } from '../../../shared/GlobalAdsKeys';

export default function CryptoCurenciesListComponent({ navigation, route }) {
   console.log('CryptoCurenciesListComponent');

   const [isLoading, setLoading] = useState(false);

   const [cryptoCurenciesList, setCryptoCurenciesList] = useState(
      CryptoCurrencies
   );

   const [realCurrency, setRealCurrency] = useState();

   const retrieveData = async () => {
      console.log('CryptoCurrenciesListComponent realCurrencyCode z route: ', route.params.realCurrencyCode);
      console.log('CryptoCurrenciesListComponent token z route: ', route.params.token);

      try {
        const value = await AsyncStorage.getItem('realCurrencyCode');
        
        if (value !== null) {
         setRealCurrency(value);
        }
        else {
         console.log('realCurrencyCode not found in DB, so setting it to EUR');
         setRealCurrency('EUR');
        }
      } 
      catch (error) {
        // Error retrieving data
        console.log(error);
        setRealCurrency('EUR');
      }
   };

   useEffect(() => {
      retrieveData();
      setLoading(false);
    }, []);

   const onPressHandler = async (item) => {
      navigation.navigate('CryptoCurrencyViewComponent', {
         code: item.code,
         name: item.name,
         logo: item.logo,
         token: route.params.token,
         realCurrencyCode: realCurrency
      });
   };

   return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="black" translucent={true} />
         {isLoading ? 
            <BarIndicator 
               color={GlobalStyles.textColor} 
               backgroundColor={GlobalStyles.backgroundColor}
               count={5}
            /> : (
            <View style={styles.currencyItems}>
               <Text style={styles.description}>
                  Choose a crypto currency to predict:
               </Text>
               <FlatList
                  keyExtractor={(item) => item.id}
                  data={ cryptoCurenciesList }
                  renderItem={({ item }) => (
                     <TouchableOpacity onPress={() => onPressHandler(item)}>
                        <CryptoCurrenciesListItemComponent code={item.code} name={item.name} logo={item.logo}/>
                     </TouchableOpacity>
                  )}
               />
            </View>
         )}
         <View style={styles.ad}>
            <AdMobBanner
               bannerSize="banner"
               adUnitID={GlobalAdsKeys.bannerKey}
               // setTestDeviceID1="EMULATOR"
               servePersonalizedAds={false}
               onDidFailToReceiveAdWithError={(e) => console.log(e)}
            />
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
      padding: 20,
      width: normalizeWidth(350),
      flex: 1
   },

   description: {
      color: GlobalStyles.textColor,
      fontSize: normalizeWidth(16),
      margin: normalizeHeight(10),
   },

   ad: {
      marginBottom: normalizeHeight(20)
   }
 });