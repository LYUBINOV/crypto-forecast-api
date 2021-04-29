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

export default function LoginComponent({ navigation }) {
   const [isLoading, setLoading] = useState(true);
   const [token, setToken] = useState();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [errorModal, setErrorModal] = useState(false);
   const [errorModalText, setErrorModalText] = useState('');

   const retrieveUserData = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userPassword = await AsyncStorage.getItem('userPassword');
        
        if ((userEmail !== null) && (userPassword !== null)) {
         return {
            userEmail: userEmail,
            userPassword: userPassword
         };
        }
      } 
      catch (error) {
        console.log(error);
      }

      return {
         userEmail: '',
         userPassword: ''
        };
   };

   const loginUser = async (retVal) => {
      return await fetch('https://cryptoapp.pythonanywhere.com/api/login', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
         },
         body: JSON.stringify({
            email: retVal.userEmail,
            password: retVal.userPassword
         })
      })
   };
   
   const checkToken = async (_token, save) => {
      setLoading(false);
      
      if(_token !== undefined) {
         setToken(_token)

         if(save) {
            try {
               await AsyncStorage.setItem(
                  'userEmail', email
               );

               await AsyncStorage.setItem(
                  'userPassword', password
               );
            } 
            catch (error) {
               console.log(error);
            }
         }

         navigation.dispatch(
            CommonActions.reset({
               index: 0,
               routes: [{ 
                  name: 'AfterLoginRouter',
                  params: {
                     token: _token,
                  }
               }],
            })
         );
      }
   }

   useEffect(() => {
      retrieveUserData()
      .then((retVal) => loginUser(retVal))
      .then((response) => response.json())
      .then((json) => checkToken(json.token))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    }, []);

   const loginOnPressHandler = async () => {
      try {
         const response = await loginUser({userEmail: email, userPassword: password})
         const json = await response.json();

         if(json.errorCode == 500) {
            setErrorModalText('User not found');
            setErrorModal(true);
         }
         else if(json.errorCode == 401) {
            setErrorModalText(json.info);
            setErrorModal(true);
         }
         else {
            checkToken(json.token, true);
         }
      }
      catch (error) {
         console.log(error);
      }
   };

   const registerOnpressHandler = () => {
      navigation.navigate('RegistrationComponent', { 

         }
      );
   }

   const resetPasswordOnpressHandler = () => {
      navigation.navigate('ResetPasswordComponent', { 

         }
      );
   }

   return (
      <View style={styles.root}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="black" translucent={true} />
      {isLoading ? <BarIndicator 
                     color={GlobalStyles.textColor} 
                     backgroundColor={GlobalStyles.backgroundColor}
                     count={5}
                  /> : (
         <View style={styles.container}>
            <Modal 
               isVisible={errorModal}
               animationIn	= 'zoomIn' //todo: vybrat animaciu prichodu https://www.npmjs.com/package/react-native-modal
               animationOut = 'zoomOut' //todo: vybrat animaciu odchodu https://www.npmjs.com/package/react-native-modal
            >
               <View style={styles.modalView}>
                  <View style={styles.modalContent}>
                     <Text style={styles.modalText}>{errorModalText}</Text>
                     <TouchableOpacity style={styles.modalTouchableOpacity} onPress={() => setErrorModal(false) }>
                        <Text style={{color: 'white'}}>Close</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Modal>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <TextInput 
               style={[GlobalStyles.textInput, {marginBottom: normalizeHeight(20)}]}
               placeholder='Email'
               placeholderTextColor='rgba(255,255,255,0.7)'
               onChangeText={(value) => setEmail(value)}
               autoCapitalize = 'none'
            />
            <TextInput 
               style={[GlobalStyles.textInput, {marginBottom: normalizeHeight(20)}]}
               placeholder='Password'
               placeholderTextColor='rgba(255,255,255,0.7)'
               secureTextEntry
               onChangeText={(value) => setPassword(value)}
               autoCapitalize = 'none'
            />
            <TouchableOpacity style={styles.loginTouchableOpacity} onPress={() => loginOnPressHandler()}>
               <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.registerLinkView}>
               <TouchableOpacity 
                  style={styles.registerLinkTouchableOpacity}
                  onPress={() => resetPasswordOnpressHandler()}>
                     <Text style={{color: 'lightblue', textDecorationLine: 'underline'}}>I forgot my password</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.registerLinkView}>
               <Text style={{color: GlobalStyles.textColor}}>New user?</Text>
               <TouchableOpacity 
                  style={styles.registerLinkTouchableOpacity}
                  onPress={() => registerOnpressHandler()}>
                     <Text style={{color: 'lightblue', textDecorationLine: 'underline'}}>Join free</Text>
               </TouchableOpacity>
            </View>
         </View>
      )}
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
   loginTouchableOpacity: {
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
   loginText: {
      textAlign: 'center',
      color: GlobalStyles.textColor,
      fontWeight: 'bold'
   },
   registerLinkView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: normalizeHeight(10),
   },
   registerLinkTouchableOpacity: {
      marginLeft: normalizeWidth(10), 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center'
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
      marginBottom: normalizeHeight(20)
   },
   modalTouchableOpacity: {
      backgroundColor: GlobalStyles.backgroundColor,
      borderRadius: GlobalConstants.borderRadius,
      paddingHorizontal: normalizeHeight(30),
      paddingVertical: normalizeHeight(10)
      // marginBottom: 20
   }
 });


