import React from 'react';
import { StyleSheet, View } from 'react-native';

import AdditionalInfoTabItemComponent from './AdditionalInfoTabItemComponent';

import { GlobalStyles, normalizeHeight } from '../../../shared/GlobalStyles';

export default function AdditionalInfoTabComponent({ realCurrencyCode, details }) {
   const parseCurrency = (currency) => {
      return parseFloat(currency).toFixed(4);
   };

   return (
     <View style={styles.container}>
         <View style={styles.firstRow}>
            <AdditionalInfoTabItemComponent 
               label={"Closing " + realCurrencyCode} 
               cryptoCurrencyPrice={parseCurrency(details.close)}
            />

            <AdditionalInfoTabItemComponent 
               label={"Volume " + realCurrencyCode} 
               cryptoCurrencyPrice={parseCurrency(details.open)}
            />
         </View>
         
         <View style={styles.secondRow}>
            <AdditionalInfoTabItemComponent 
               label={"Lowest " + realCurrencyCode} 
               cryptoCurrencyPrice={parseCurrency(details.low)}
            />

            <AdditionalInfoTabItemComponent 
               label={"Highest " + realCurrencyCode} 
               cryptoCurrencyPrice={parseCurrency(details.high)}
            />
         </View>
     </View>
   );
 }

const styles = StyleSheet.create({
   container: {
   //   flex: 1,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
   //   marginBottom: normalizeHeight(5),
   },
   firstRow: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // flex: 1,
   },
   secondRow: {
      flexDirection: 'column',
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
 });


