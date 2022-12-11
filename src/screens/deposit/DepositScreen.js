import React, { useState, useEffect } from 'react';
import { Button, View, Toast, Text, Image} from 'react-native-ui-lib';
import { StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../../navigation/AppContext';
import { Icon } from 'react-native-eva-icons';
import { serviceDepositAmount } from '../../apiServices/apiServices';

const validationSchema = Yup.object().shape({
  amount: Yup.string().max(15).required('Required'),
});

export default function Deposit({ navigation }) {
    const [isFailed, setIsFailed] = useState(false);
    const [toast, setToast] = useState({
      isShowtoast: false,
      color: '#000000',
      msg: ''
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    async function uploadImageAsync(uid,uname, amount, uri) {
      let apiUrl = 'https://rsofttech.com/test/admin/api/makedeposit.php';
    
      // Note:
      // Uncomment this if you want to experiment with local server
      //
      // if (Constants.isDevice) {
      //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
      // } else {
      //   apiUrl = `http://localhost:3000/upload`
      // }
    
      let fileType = 'jpg';
      console.log('before formdata', {
        uid,uname, amount, uri
      });    
      let formData = new FormData();
      formData.append('fileToUpload', {
        uri,
        name: `photo_${new Date()}.${fileType}`,
        type: `image/${fileType}`,
      });
      formData.append('amount', amount);
      formData.append('uid', uid);
      formData.append('uname', uname);    
      let options = {
        method: 'POST',
        body: formData,
        headers: {
          // Accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      };
      console.log('before fetch ', options, apiUrl);
      let response = await fetch(apiUrl, options);
      console.log('response aaa gaya');
      response = await response.json();
      console.log('convert ho gaya');
      console.log('response ', response);
      return response;
    }

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
  
    return (
      <>
      <AppContext.Consumer>
        {({user, setIsLogedIn, setUser}) => user && (
          <ScrollView>
            <View flex paddingH-20 paddingT-20 >
            <Formik
                initialValues={{
                  amount: '',
                }}
                validationSchema={validationSchema}
                onSubmit={ async (values) => {
                  await uploadImageAsync(user.id, user.uname, values.amount, image);
                }}
              >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View flex  >
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Amount"
                    placeholderTextColor="#60605e"
                    numeric
                    keyboardType={'numeric'}
                    onChangeText={handleChange('amount')}
                    onBlur={handleBlur('amount')}
                    value={values.amount}
                  />
                  {Boolean(touched.amount && errors.amount) && (
                    <Text red30 text80 marginL-20>
                      {errors.amount}
                    </Text>
                  )}
                  <Button
                    marginT-30
                    white
                    background-orange20
                    onPress={pickImage}                  
                  >
                    <Icon 
                      name={'image'} 
                      fill='white'  
                      width={20}
                      height={20}
                    />
                    <Text marginL-20 white>
                      Pick Receipt
                    </Text>
                  </Button>
                  <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6            
                    }} 
                  >
                  {image && <Image 
                    source={{ uri: image }} 
                    marginT-20 
                    style={{ 
                      borderRadius: 20, 
                      marginLeft: '10%', 
                      width: '80%', 
                      height: 200,
                    }} />}
                  </View>
                  <View flex marginT-50 style={{ elevation: 5 }} >
                    <Button 
                      text70 white background-green20 
                      label="Update"
                      onPress={handleSubmit}
                    />
                    <Button 
                      link text70 blue20 marginT-20 marginB-50
                      label="Cancel"
                      onPress={() => {
                        navigation.navigate('Dashboard');
                      }} 
                    />
                  </View>
                </View>
              )}
              </Formik>
            </View>
          </ScrollView>
        )}
      </AppContext.Consumer>
        <Toast
          visible={toast.isShowtoast}
          backgroundColor={toast.color}
          message={toast.msg}
          onDismiss={() => {
            setToast({isShowtoast: false});
          }}
          position={'bottom'}
          autoDismiss={3000}
          showDismiss
          centerMessage
        />
      </>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 130,
        height: 130,
        alignSelf: 'center',
        marginBottom: 20
    },
    textInputStyle: {
      width: '100%',
      backgroundColor: '#ffffff',
      padding: 16,
      fontSize: 25
    }
});