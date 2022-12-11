import React, { useState } from 'react';
import { Button, View, TextField, Toast} from 'react-native-ui-lib';
import { StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { serviceUpdateUser } from '../../apiServices/apiServices';
import { AppContext } from '../../navigation/AppContext';
import PasswordField from '../../components/PasswordField';

const validationSchema = Yup.object().shape({
  firstname: Yup.string().max(15).required('Required'),
  lastname: Yup.string().max(20).required('Required'),
  email: Yup.string().email().required('Required'),
  phone: Yup.string().required('Required'),
  city: Yup.string().max(20).min(3).required('Required'),
  username: Yup.string()
    .min(3, 'Must be 3 characters or More')
    .max(20, 'Must be 20 characters or less')
    .required(),
  password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default function Profile({ navigation }) {
    const [isFailed, setIsFailed] = useState(false);
    const [toast, setToast] = useState({
      isShowtoast: false,
      color: '#000000',
      msg: ''
    });
    return (
      <>
      <AppContext.Consumer>
        {({user, setIsLogedIn, setUser}) => user && (
          <ScrollView>
            <View flex paddingH-20 paddingT-20 >
            <Formik
                initialValues={{
                  firstname: user.firstname ? user.firstname : '',
                  lastname: user.lastname ? user.lastname : '',
                  phone: user.phone ? user.phone : '',
                  city: user.city ? user.city : '', 
                  email: user.email ? user.email : '', 
                  username: user.username ? user.username : '',
                  password: user.password ? user.password : '',
                  confirmPassword: '' 
                }}
                validationSchema={validationSchema}
                onSubmit={ async (values) => {
                  const response = await serviceUpdateUser({...user,...values});
                  if (response) {
                    console.log({msd:'Profile Updated', sent:{...user,...values}, received: response});
                    setUser({...user,...values});
                    setToast({
                      isShowtoast: true,
                      color: '#2b8d3d',
                      msg: 'Success: Updated User'
                    });
                    return;
                  }
                  setToast({
                    isShowtoast: true,
                    color: '#ff0033',
                    msg: 'A Error Occured'
                  });
                  return;
                }}
              >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View flex  >
                  <TextField 
                    text60 dark10 THIN
                    placeholder="Firstname" 
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                    enableErrors={Boolean(touched.firstname && errors.firstname)}
                    error={touched.firstname && errors.firstname}  
                  />
                  <TextField 
                    text60 dark10 THIN
                    placeholder="Lastname" 
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                    enableErrors={Boolean(touched.lastname && errors.lastname)}
                    error={touched.lastname && errors.lastname}  
                  />
                  <TextField 
                    text60 dark10 THIN
                    placeholder="Phone" 
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    enableErrors={Boolean(touched.phone && errors.phone)}
                    error={touched.phone && errors.phone}  
                  />
                  <TextField 
                    text60 dark10 THIN
                    placeholder="email" 
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    enableErrors={Boolean(touched.email && errors.email)}
                    error={touched.email && errors.email}  
                  />
                  <TextField 
                    text60 dark10 THIN
                    placeholder="City" 
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    value={values.city}
                    enableErrors={Boolean(touched.city && errors.city)}
                    error={touched.city && errors.city}  
                  />
                  <TextField 
                    text60 dark10 THIN
                    placeholder="Username" 
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    enableErrors={Boolean(touched.username && errors.username)}
                    error={touched.username && errors.username}  
                  />
                  <PasswordField 
                    placeholder="password" 
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    enableErrors={Boolean(touched.password && errors.password)}
                    error={touched.password && errors.password}
                  />
                  <PasswordField
                    placeholder="Confirm Password" 
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    enableErrors={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    error={touched.confirmPassword && errors.confirmPassword}
                  />
                  <View flex marginT-50>
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
    }
});