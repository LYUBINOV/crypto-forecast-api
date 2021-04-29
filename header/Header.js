import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { GlobalStyles } from '../shared/GlobalStyles';

export default function Header({ title, navigation, route }) {
   const [appCurrency, setAppCurrency] = useState('');

   const openMenu = () => {
      navigation.openDrawer();
   } 

   const getRealCurrencyCode = async () => {
      try {
         const realCurrencyCode = await AsyncStorage.getItem('realCurrencyCode');
         
         if (realCurrencyCode !== null) {
            setAppCurrency(realCurrencyCode);
         }
         else {
            setAppCurrency('EUR');
         }
       } 
       catch (error) {
         console.log(error);
       }
   }

   useEffect(() => {
      getRealCurrencyCode();
    }, []);

   return(
      <View style={styles.container}>
         <View style={styles.header}>
            <View style={styles.menuIconView}>
               <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.menuIcon} />
            </View>
            <View style={styles.titleView}>
               <Text style={styles.title}>{title}</Text>
            </View>   
            <View style={styles.realCurrencyView}>
               <Text style={styles.realCurrency}>{appCurrency ? appCurrency : 'EUR'}</Text>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      // backgroundColor: GlobalStyles.backgroundColor, //TODO: toto osefovat, aku farbu nechat pre statusbar
   },
   
   header: {
      marginTop: StatusBar.currentHeight,
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: GlobalStyles.cardColor,
   },

   menuIconView: {
      alignItems: 'flex-start',
      paddingLeft: 10,
   },
   menuIcon: {
      color: GlobalStyles.textColor
   },

   titleView: {
      flex: 1,
      alignItems: 'center',
      paddingRight: 10,
      paddingLeft: 10,
   }, 
   title: {
      fontWeight: 'bold',
      fontSize: 20,
      color: GlobalStyles.textColor,
      letterSpacing: 1
   },

   realCurrencyView: {
      alignItems: 'flex-end',
      paddingRight: 10,
   },
   realCurrency: {
      fontSize: 20,
      color: GlobalStyles.textColor,
   }
});