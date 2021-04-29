import React, { useState, useEffect } from 'react';
import { 
   StyleSheet, 
   TextInput, 
   View, 
   TouchableOpacity, 
   AsyncStorage, 
   Dimensions, 
   Image, 
   Text,
   StatusBar
} from 'react-native';

import { CommonActions } from '@react-navigation/native';

import { BarIndicator } from 'react-native-indicators';

import Modal from 'react-native-modal';

import { GlobalStyles, normalizeWidth, normalizeHeight } from '../../shared/GlobalStyles';
import { GlobalConstants } from '../../shared/GlobalConstants';

export default function ResetPasswordComponent({ navigation }) {
   const [email, setEmail] = useState();
   const [infoModal, setInfoModal] = useState(false);
   const [modalText, setModalText] = useState('Please check your email for a password reset link.');

   const resetPasswordOnPressHandler = () => {
      fetch('https://cryptoapp.pythonanywhere.com/api/resetPassword', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
         },
         body: JSON.stringify({
            email: email
         })
      })
      .then((response) => response.json())
      .then((json) => { 
         // console.log(json);
         // setModalText(json.info); 
         setInfoModal(true);
      })
      .catch((error) => console.error(error));
   }

   const closeModalOnPressHandler = () => {
      setInfoModal(false);
      navigation.pop();
   }

   return (
      <View style={styles.root}>
         <StatusBar barStyle="light-content" hidden={false} backgroundColor="black" translucent={true} />
         <View style={styles.container}>
            <Modal 
               isVisible={infoModal}
               animationIn	= 'zoomIn' //todo: vybrat animaciu prichodu https://www.npmjs.com/package/react-native-modal
               animationOut = 'zoomOut' //todo: vybrat animaciu odchodu https://www.npmjs.com/package/react-native-modal
            >
               <View style={styles.modalView}>
                  <View style={styles.modalContent}>
                     <Text style={styles.modalText}>{modalText}</Text>
                     <TouchableOpacity style={styles.modalTouchableOpacity} onPress={() => closeModalOnPressHandler() }>
                        <Text style={{color: 'white'}}>Close</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Modal>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.text}>Please enter your email to reset password:</Text>
            <TextInput 
               style={[GlobalStyles.textInput, {marginBottom: 20}]}
               placeholder='Email'
               placeholderTextColor='rgba(255,255,255,0.7)'
               onChangeText={(value) => setEmail(value)}
               autoCapitalize = 'none'
            />
            <TouchableOpacity style={styles.resetPasswordTouchableOpacity} onPress={() => resetPasswordOnPressHandler()}>
               <Text style={styles.resetPasswordText}>RESET PASSWORD</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
 }

const styles = StyleSheet.create({
   root: {
      flex: 1
   },
   container: {
     flex: 1,
     flexDirection: 'column',

     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: GlobalStyles.backgroundColor
   },
   logo: {
      height: 300,
      width: 300,
      resizeMode:'contain',
      marginBottom: normalizeHeight(20)
   },
   text: {
      color: GlobalStyles.textColor,
      marginBottom: normalizeHeight(10),
      textAlign: 'center'
   },
   resetPasswordTouchableOpacity: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.3)',
      height: normalizeHeight(30),
      width: normalizeWidth(220),
      borderRadius: GlobalConstants.borderRadius,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: GlobalStyles.textColor,
      marginBottom: normalizeHeight(20),
   },
   resetPasswordText: {
      textAlign: 'center',
      color: GlobalStyles.textColor,
      fontWeight: 'bold'
   },
   modalContent: {
      borderRadius: GlobalConstants.borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      // flex: 1,
      flexDirection: 'column',
      backgroundColor: GlobalStyles.cardColor,
      padding: normalizeWidth(20),
      // padding
      // width: Dimensions.get('window').width - GlobalConstants.subtractDimensionWidth - 50,
   },
   modalView: {
      borderRadius: GlobalConstants.borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'column',
   },
   modalText: {
      color: GlobalStyles.textColor,
      marginBottom: normalizeHeight(20),
      textAlign: 'center'
   },
   modalTouchableOpacity: {
      backgroundColor: GlobalStyles.backgroundColor,
      borderRadius: GlobalConstants.borderRadius,
      paddingHorizontal: normalizeHeight(30),
      paddingVertical: normalizeHeight(10)
      // marginBottom: 20
   }
 });


