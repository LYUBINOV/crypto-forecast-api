import React, { useState, useEffect } from 'react';
import { 
   StyleSheet, 
   TextInput, 
   View, 
   TouchableOpacity, 
   SafeAreaView, 
   ScrollView,
   Dimensions, 
   Image, 
   Text,
   StatusBar,
   CheckBox
} from 'react-native';

import Modal from 'react-native-modal';

import { Formik } from 'formik';
import * as yup from 'yup';

import { GlobalStyles, normalizeWidth, normalizeHeight } from '../../shared/GlobalStyles';
import { GlobalConstants } from '../../shared/GlobalConstants';

import Conditions from '../../static_datas/conditions';

//TODO: dorobit checkbox na podmienky pouzivania, vseobecne pravidla atd..
//https://react-native-elements.github.io/react-native-elements/docs/checkbox.html

const registerSchema = yup.object({
   // userName: yup.string()
   //              .required('Username is required.')
   //              .min(3),
   // firstName: yup.string()
   //               .required('First name is required.')
   //               .min(1),
   // lastName: yup.string()
   //               .required('Last name is required.')
   //               .min(1),
   email: yup.string()
             .required('Email is required.')
             .email('Email must has valid structure.'),
   password: yup.string()
                .required('Password is required.')
                .matches(/(?=\D*\d)(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])[A-Za-z0-9]{6,}$/,
                        'Must contain 6 characters, uppercase letter and number.'),
   confirmPassword: yup.string()
                       .required()
                       .oneOf([yup.ref('password')], 'The passwords must match!')
                       .required('Password confirm is required.'),
   acceptedConditions: yup.bool()
                          .oneOf([true], 'Accept Terms & Conditions is required.')
 });

export default function RegistrationComponent({ navigation }) {
   const [errorModal, setErrorModal] = useState(false);
   const [errorModalText, setErrorModalText] = useState('');

   const [conditionsModal, setConditionsModal] = useState(false);

   const [navigateToLoginScreen, setNavigateToLoginScreen] = useState(false);

   const registerUser = (values) => {
      return fetch('https://cryptoapp.pythonanywhere.com/api/register', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
         },
         body: JSON.stringify({
            userName: values.userName,
            // firstName: values.firstName,
            // lastName: values.lastName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            acceptedConditions: values.acceptedConditions
         })
      });
   }

   const checkResponse = (response, actions) => {
      if(response.errorCode == 400) {
         console.log('400');
         console.log('User already exists.');
         setErrorModal(true);
         setErrorModalText('User already exists.')
      }
      else if(response.info) {
         console.log('info');
         console.log(response.info);
         setErrorModal(true);
         setErrorModalText(response.info);
         setNavigateToLoginScreen(true)
         actions.resetForm();
      }

      console.log(response);
   }

   const evaluateClose = () => {
      if(navigateToLoginScreen) {
         navigation.pop();
      } 
      else {
         setErrorModal(false);
      }
   }

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="light-content" hidden={false} backgroundColor="black" translucent={true} />
         <ScrollView style={styles.scrollView}>
            {/* RESPONSE MODAL */}
            <Modal 
               isVisible={errorModal}
               animationIn	= 'zoomIn' //todo: vybrat animaciu prichodu https://www.npmjs.com/package/react-native-modal
               animationOut = 'zoomOut' //todo: vybrat animaciu odchodu https://www.npmjs.com/package/react-native-modal
            >
               <View style={styles.modalView}>
                  <View style={styles.modalContent}>
                     <Text style={styles.modalText}>{errorModalText}</Text>
                     <TouchableOpacity style={styles.modalTouchableOpacity} onPress={() => evaluateClose() }>
                        <Text style={{color: 'white'}}>Close</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Modal>

            {/* CONDITIONS MODAL */}
            <Modal 
               isVisible={conditionsModal}
               animationIn	= 'zoomIn' //todo: vybrat animaciu prichodu https://www.npmjs.com/package/react-native-modal
               animationOut = 'zoomOut' //todo: vybrat animaciu odchodu https://www.npmjs.com/package/react-native-modal
            >
            <ScrollView style={styles.modalScrollView}>
               <View style={styles.modalView}>
                  <View style={styles.modalContent}>
                        <Text style={styles.modalText}><Conditions/></Text>
                        <TouchableOpacity style={styles.modalTouchableOpacity} onPress={() => setConditionsModal(false) }>
                           <Text style={{color: 'white'}}>Close</Text>
                        </TouchableOpacity>
                  </View>
               </View>
               </ScrollView>

            </Modal>

            <Formik
               initialValues={{
                  // userName: '',
                  // firstName: '',
                  // lastName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  acceptedConditions: false
               }}
               validationSchema={registerSchema}
               onSubmit={(values, actions) => {
                  registerUser(values)
                  .then((response) => response.json())
                  .then((json) => checkResponse(json, actions))
                  .catch((error) => console.error(error))
               }} 
            >
            {formikProps => (
               <View style={styles.formikView}>
                  <Image source={require('../../assets/logo.png')} style={styles.logo} />

                  {/* <Text style={styles.text}>Username:</Text>
                  <TextInput
                     style={GlobalStyles.textInput}
                     placeholder='e.g. john.smith'
                     onChangeText={formikProps.handleChange('userName')}
                     onBlur={formikProps.handleBlur('userName')} 
                     value={formikProps.values.userName}
                     autoCapitalize = 'none'
                  />
                  <Text style={GlobalStyles.errorText}>{formikProps.touched.userName && formikProps.errors.userName}</Text>

                  <Text style={styles.text}>First name:</Text>
                  <TextInput
                     style={GlobalStyles.textInput}
                     placeholder='e.g. John'
                     onChangeText={formikProps.handleChange('firstName')}
                     onBlur={formikProps.handleBlur('firstName')} 
                     value={formikProps.values.firstName}
                  />
                  <Text style={GlobalStyles.errorText}>{formikProps.touched.firstName && formikProps.errors.firstName}</Text>

                  <Text style={styles.text}>Last name:</Text>
                  <TextInput
                     style={GlobalStyles.textInput}
                     placeholder='e.g. Smith'
                     onChangeText={formikProps.handleChange('lastName')}
                     onBlur={formikProps.handleBlur('lastName')} 
                     value={formikProps.values.lastName}
                  />
                  <Text style={GlobalStyles.errorText}>{formikProps.touched.lastName && formikProps.errors.lastName}</Text> */}

                  <Text style={styles.text}>Email:</Text>
                  <TextInput
                     style={GlobalStyles.textInput}
                     placeholder='xyz@example.com'
                     onChangeText={formikProps.handleChange('email')}
                     onBlur={formikProps.handleBlur('email')} 
                     value={formikProps.values.email}
                     autoCapitalize = 'none'
                  />
                  <Text style={GlobalStyles.errorText}>{formikProps.touched.email && formikProps.errors.email}</Text>

                  <Text style={styles.text}>Password:</Text>
                  <TextInput
                     style={GlobalStyles.textInput}
                     placeholder='password'
                     onChangeText={formikProps.handleChange('password')}
                     onBlur={formikProps.handleBlur('password')} 
                     value={formikProps.values.password}
                     secureTextEntry
                     autoCapitalize = 'none'
                  />
                  <Text style={GlobalStyles.errorText}>{formikProps.touched.password && formikProps.errors.password}</Text>

                  <Text style={styles.text}>Confirm password:</Text>
                  <TextInput
                     style={GlobalStyles.textInput}
                     placeholder='confirm password'
                     onChangeText={formikProps.handleChange('confirmPassword')}
                     onBlur={formikProps.handleBlur('confirmPassword')} 
                     value={formikProps.values.confirmPassword}
                     secureTextEntry
                     autoCapitalize = 'none'
                  />
                  <Text style={GlobalStyles.errorText}>{formikProps.touched.confirmPassword && formikProps.errors.confirmPassword}</Text>

                  <View style={styles.checkboxView}>
                     <Text style={styles.textCheckbox}>{"Accepting "}</Text>
                     <TouchableOpacity 
                        style={styles.conditionsTouchableOpacity}
                        onPress={() => setConditionsModal(true)}>
                           <Text style={{color: 'lightblue', textDecorationLine: 'underline'}}>{"Terms & Conditions"}</Text>
                     </TouchableOpacity>
                     <CheckBox
                        style={styles.checkbox}
                        onValueChange={(value) => formikProps.setFieldValue('acceptedConditions', value)}
                        onBlur={formikProps.handleChange('acceptedConditions')}
                        value={formikProps.values.acceptedConditions}
                        tintColors={{ true: '#FFC300', false: 'white' }}
                     />
                  </View>
                  <Text style={GlobalStyles.errorText}>{formikProps.touched.acceptedConditions && formikProps.errors.acceptedConditions}</Text>

                  <TouchableOpacity style={styles.registerTouchableOpacity} onPress={formikProps.handleSubmit}>
                     <Text style={styles.registerText}>REGISTER</Text>
                  </TouchableOpacity> 
               </View>
            )}
            </Formik>  
         </ScrollView>      
      </SafeAreaView>
   );
 }

const styles = StyleSheet.create({
   container: {
     flex: 1,
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: GlobalStyles.backgroundColor
   },
   scrollView: {
      padding: normalizeWidth(40)
   },
   formikView: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
   },
   logo: {
      height: 300,
      width: 300,
      resizeMode:'contain',
      marginBottom: normalizeHeight(20)
   },
   registerTouchableOpacity: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.3)',
      height: normalizeHeight(30),
      width: normalizeWidth(220),
      borderRadius: GlobalConstants.borderRadius,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: GlobalStyles.textColor,
      marginBottom: normalizeHeight(60),
      flexDirection: 'column',
      // flex: 1
   },
   registerText: {
      textAlign: 'center',
      color: GlobalStyles.textColor,
      fontWeight: 'bold'
   },
   modalContent: {
      borderRadius: GlobalConstants.borderRadius,
      backgroundColor: GlobalStyles.cardColor,
      alignItems: 'center',
      justifyContent: 'center',
      // flex: 1,
      flexDirection: 'column',
      // backgroundColor: GlobalStyles.cardColor,
      padding: normalizeWidth(20),
      // padding
      // width: Dimensions.get('window').width - GlobalConstants.subtractDimensionWidth - 50,
   },
   modalScrollView: {
      backgroundColor: GlobalStyles.cardColor,
      borderRadius: GlobalConstants.borderRadius
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
      textAlign: 'center',
      marginBottom: normalizeHeight(20)
   },
   modalTouchableOpacity: {
      backgroundColor: GlobalStyles.backgroundColor,
      borderRadius: GlobalConstants.borderRadius,
      paddingHorizontal: normalizeHeight(30),
      paddingVertical: normalizeHeight(10)
      // marginBottom: 20
   },
   text: {
      color: GlobalStyles.textColor,
      marginBottom: normalizeHeight(10)
   },
   checkboxView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   checkbox: {
      alignSelf: "center",
   },
   textCheckbox: {
      color: GlobalStyles.textColor
   },
   conditionsTouchableOpacity: {
      marginRight: normalizeWidth(10), 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center'
   },
 });


