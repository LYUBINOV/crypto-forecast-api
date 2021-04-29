import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { GlobalStyles, normalizeWidth, normalizeHeight } from '../../../shared/GlobalStyles';

export default function CryptoCurrenciesListItemComponent({ code, name, logo }) {
   return (
      <View style={styles.container}>
         <View style={styles.imageView}>
            <Image source={logo} style={styles.logo} />
         </View>
         <View style={styles.nameView}>
            <Text style={styles.name}>
               {name}
            </Text>
         </View>
         <View style={styles.codeView}>
            <Text style={styles.code}>
               {code}
            </Text>
         </View>
     </View>
   );
}
 
const styles = StyleSheet.create({
   container: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: GlobalStyles.cardColor,
     borderRadius: 10,
     margin: normalizeWidth(10),
     flex: 1
   },
   nameView: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: normalizeWidth(16)
   },
   name: {
      color: GlobalStyles.textColor,
      fontSize: normalizeWidth(16),
      fontWeight: 'bold'
   },
   codeView: {
      alignItems: 'flex-end',
      margin: normalizeWidth(16)
   },
   code: {
      color: GlobalStyles.textColor,
      fontSize: normalizeWidth(16),
   },
   imageView: {
      marginLeft: normalizeWidth(16),
      marginRight: normalizeWidth(16)
   }, 
   logo: {
      width: normalizeWidth(40),
      height: normalizeWidth(40),
   }
 });


