import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles, normalizeWidth, normalizeHeight } from '../../../shared/GlobalStyles';

export default function AdditionalInfoTabItemComponent({ label, cryptoCurrencyPrice }) {
   return (
     <View style={styles.container}>
         <Text style={styles.label}>
            {label}
         </Text>
         <Text style={styles.cryptoCurrencyPrice}>
            {cryptoCurrencyPrice}
         </Text>
     </View>
   );
 }

const styles = StyleSheet.create({
   container: {
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: GlobalStyles.cardColor,
     borderRadius: 20,
     width: normalizeWidth(120),
     height: normalizeHeight(55),
     margin: normalizeHeight(10)
   },
   label: {
      color: GlobalStyles.textColor,
      fontSize: normalizeWidth(15),
      marginBottom: normalizeHeight(10)
   },
   cryptoCurrencyPrice: {
      color: GlobalStyles.textColor,
      fontSize:   normalizeWidth(15),
      fontWeight: 'bold'
   },
 });


