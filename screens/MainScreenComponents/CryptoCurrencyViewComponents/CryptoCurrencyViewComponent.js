import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import { BarIndicator } from 'react-native-indicators';

import LogoComponent from './LogoComponent';
import AdditionalInfoTabComponent from './AdditionalInfoTabComponent';
import PredictionComponent from './PredictionComponent';
import GraphComponent from './GraphComponent';

import { GlobalStyles, normalizeHeight } from '../../../shared/GlobalStyles';
import { GlobalAdsKeys } from '../../../shared/GlobalAdsKeys';

import { AdMobBanner, AdMobInterstitial, setTestDeviceIDAsync } from 'expo-ads-admob';

export default function CryptoCurrencyViewComponent({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  
  const [data, setData] = useState([]);
  
  const [graph, setGraph] = useState([]);
  const [labels, setLabels] = useState([]);
  
  const URL = 'https://cryptoapp.pythonanywhere.com/api/predict?cryptoCurrency=' + route.params.code 
            + '&realCurrency=' + route.params.realCurrencyCode 
            + '&graphLimit=24';

  const showAdd = async () => {
    try {
      await AdMobInterstitial.setAdUnitID(GlobalAdsKeys.intersticialKey); // Test ID, Replace with your-admob-unit-id
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
   }
   catch (error) {
      console.error(error)
   }
  }

  useEffect(() => {
    showAdd()
    .then(() => fetch(URL, {
      method: 'GET',
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + route.params.token
      }
    }))
    .then((response) => response.json())
    .then((json) => { 
      if(json.data) {
        setGraph(json.data.graphPoints);
        setLabels(json.data.graphLabels);
        
        delete json.data.graphPoints;
        delete json.data.graphLabels;

        setData(json.data); 
      }
      else {
        console.log('Error, json does not contains data field. (CryptoCurrencyViewComponent.js, useEffect())');
      }
    })
    .catch((error) => console.error(error))
    .finally(() => {
      setLoading(false)
    });
  }, []);

  return (
     <View style={styles.root}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="black" translucent={true} />
      {isLoading ? <BarIndicator 
                      color={GlobalStyles.textColor} 
                      backgroundColor={GlobalStyles.backgroundColor}
                      count={5}
                    /> : (
        <View style={styles.container}>
          <View style={styles.screen}>
            <LogoComponent name={route.params.name} logo={route.params.logo} />
            <GraphComponent labels={labels.map(label => label + 'UTC')} data={graph} />
            <AdditionalInfoTabComponent realCurrencyCode={route.params.realCurrencyCode} details={data}/>
            <PredictionComponent realCurrencyCode={route.params.realCurrencyCode} details={data}/>
          </View>
          {/* <AdMobBanner
            bannerSize="banner"
            adUnitID={GlobalAdsKeys.bannerKey}
            // setTestDeviceID1="EMULATOR"
            onDidFailToReceiveAdWithError={(error) => console.log(error)}
          /> */}
        </View>
      )}
     </View>
   );
 }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: GlobalStyles.backgroundColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalizeHeight(50)
  },
});
