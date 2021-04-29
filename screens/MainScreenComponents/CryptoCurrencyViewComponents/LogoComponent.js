import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { GlobalStyles, normalizeWidth, normalizeHeight } from '../../../shared/GlobalStyles';

export default function LogoComponent({ name, logo }) {
   return (
     <View style={styles.container}>
         <Image style={styles.cryptoCurrencyLogo} source={logo} />
         <View style={styles.cryptoCurrencyNameView}>
            <Text style={styles.cryptoCurrencyName}>
               {name}
            </Text>
         </View>
     </View>
   );
 }

const styles = StyleSheet.create({
   container: {
   //   flex: 1,
     flexDirection:'row',
     alignItems: 'center',
     justifyContent: 'center',
   //   backgroundColor: 'red', //pre testing ucely
     marginBottom: normalizeHeight(10)
   },
   cryptoCurrencyLogo: {
      width: normalizeWidth(45),
      height: normalizeWidth(45),
   },
   cryptoCurrencyName: {
      color: GlobalStyles.textColor,
      fontSize: normalizeWidth(45)
   },
 });


