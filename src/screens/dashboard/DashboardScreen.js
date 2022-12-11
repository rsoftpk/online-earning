import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import {Colors, View, Card, CardProps, Button, Text} from 'react-native-ui-lib';
import { AppContext } from '../../navigation/AppContext';

const DashboardCard = ({label, value, color = {['bg-red30']: true}}) => {
  return (
    <Card flex margin-10 height={160} onPress={() => {}} useNative activeOpacity={1} activeScale={0.96}>
      <Card.Section
        bg-green50
        padding-20
        flex-3
        content={[
          {text: 'Amount', text70: true, white: true},
          {text: value, text60: true, white: true}
        ]}
        contentStyle={{alignItems: 'center'}}
      />
      <Card.Section
        bg-white
        padding-20
        flex
        content={[{text: label, text70: true, grey10: true}]}
        contentStyle={{alignItems: 'center', margin: 0, padding: 0}}
      />
    </Card>
  );
};

const DashboardScreen = ({ navigation }) => (
  <AppContext.Consumer>
    {({setIsLogedIn, setUser}) => (
      <View flex bg-white paddingT-30>
        <Image 
          source={require('../../assets/undraw_crypto_portfolio.png')}
          style={styles.logo}
        />
        <View row spread marginB-10>
          <DashboardCard label="Total Withdrawl" value="2000" color={{['bg-green20']: true}} />
          <DashboardCard label="Total Deposit" value="1000" color={{['bg-blue20']: true}} />
        </View>
        <View row spread marginB-10>
          <DashboardCard label="Pending" value="4000" color={{['bg-orange20']: true}} />
          <DashboardCard label="Last Withdrawl" value="500" color={{['bg-grey20']: true}} />
        </View>
        <Button 
          link text70 red20 marginT-20
          label="Log Out"
          onPress={() => {
            setIsLogedIn(false);
            setUser(null);
          }}
        />
      </View>
    )}
  </AppContext.Consumer>
);

const styles = StyleSheet.create({
  logo: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginBottom: 40
  }
});

export default DashboardScreen;