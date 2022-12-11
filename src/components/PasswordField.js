import React, { useState } from 'react';
import { Button, View, TextField } from 'react-native-ui-lib';
import { Icon } from 'react-native-eva-icons';

const PasswordField = (props) => {
  const [isPassword, setIsPassword] = useState(true);
  return (
    <View flex row spread  >
      <TextField 
        text60 dark10
        secureTextEntry={isPassword}
        style={{width: '90%'}}
        {...props}
      />
      <Button 
        link text70 blue20 marginT-20
        onPress={() => {setIsPassword(!isPassword) }}
      >
        <Icon 
          name={ isPassword ? 'eye' : 'eye-off' } 
          fill='black'  
          width={35} 
          height={35}
        />
      </Button>
    </View>
  );
}

export default PasswordField; 