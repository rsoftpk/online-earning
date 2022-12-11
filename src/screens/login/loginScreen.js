import React, { useState } from 'react';
import { Button, Image, View, TextField, Text } from 'react-native-ui-lib';
import { StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LogIn } from '../../apiServices/apiController';
import { AppContext } from '../../navigation/AppContext';
import PasswordField from '../../components/PasswordField';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('required').email().label('Email'),
    password: Yup.string().required('required').min(4).label('Password')
});

export default function LoginScreen({ navigation }) {
    const [isFailed, setIsFailed] = useState(false);

    return (
      <AppContext.Consumer>
        {({setIsLogedIn, setUser}) => (
          <View flex paddingH-25 paddingT-100 background-white >
            <ScrollView>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={validationSchema}
                  onSubmit={ async (values) => {
                    response = await LogIn(values);
                    if(response && response.status && response.data) {
                      setIsFailed(false);
                      setIsLogedIn(true);
                      setUser(response.data);
                      return;
                    }
                    setIsFailed(true);
                    return;
                  }}
                >
                  {({ isSubmitting ,handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View flex  >
                      <Image 
                        source={require('../../assets/undraw_Savings.png')}
                        style={styles.logo}
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
                      <PasswordField 
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        enableErrors={Boolean(touched.password && errors.password)}
                        error={touched.password && errors.password}
                        placeholder="password"
                      />                        
                      <View flex marginT-100>
                        {isFailed && (
                          <Text red40 center >Email Or Password is Wrong</Text>
                        )}
                        <Button 
                          text70 white background-green20 
                          disabled={isSubmitting}
                          label={isSubmitting ? "loading..." : "Login" }
                          onPress={handleSubmit}
                        />
                        <Button 
                          link text70 blue20 marginT-20
                          label="Sign Up"
                          onPress={() => navigation.navigate('Sign Up')} 
                        />
                      </View>
                    </View>
                  )}
                </Formik>
            </ScrollView>
          </View>
        )}
      </AppContext.Consumer>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 130,
        height: 130,
        alignSelf: 'center',
        marginBottom: 40
    }
});