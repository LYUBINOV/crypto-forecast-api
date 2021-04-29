import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles, normalizeWidth } from '../../../shared/GlobalStyles';

export default function PredictionComponent({ realCurrencyCode, details }) {
   const overridePredictedAndClosingDiffColor = (predictedAndClosingDiff) => {
      if(predictedAndClosingDiff < 0) {
         return { 
            color: 'red' 
         };
      }
      else if (predictedAndClosingDiff > 0) {
         return { 
            color: 'lightgreen' 
         };
      }
      else {
         return { 
            color: 'yellow' 
         };
      }
   }

   const parseCurrency = (currency) => {
      return parseFloat(currency).toFixed(4);
   };

   const predictedAndClosingDiff = parseCurrency(details.predictedVal) - parseCurrency(details.close);

   return (
     <View style={styles.container}>
         <Text style={styles.label}>
            Hourly price prediction
         </Text>
         <View style={styles.prices}>
            <Text style={styles.predictedValue}>
               {parseCurrency(details.predictedVal) + " " + realCurrencyCode}
            </Text>
            <Text style={[
                     styles.predictedAndClosingDiff, 
                     overridePredictedAndClosingDiffColor(predictedAndClosingDiff),
                  ]}
            >
               {parseCurrency(predictedAndClosingDiff) + " " + realCurrencyCode}
            </Text>
         </View>
     </View>
   );
 }

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // flex: 1
   },
   label: {
      color: 'yellow',
      fontSize: normalizeWidth(20),
      // marginBottom: 20
   },
   prices: {
      alignItems: 'flex-end',
   },
   predictedValue: {
      color: GlobalStyles.textColor,
      fontSize: normalizeWidth(30),
      fontWeight: 'bold',
      // marginBottom: 2
   },
   predictedAndClosingDiff: {
      color: GlobalStyles.textColor,
      fontSize: normalizeWidth(15),
   },
 });


