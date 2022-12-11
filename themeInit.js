import { color } from 'react-native-reanimated';
import {Typography, Colors, Spacings} from 'react-native-ui-lib';
import {ThemeManager} from 'react-native-ui-lib';

const colors = {
  green: '#2b8d3d',
  blue: '#0c91d8',
  errorColor: "#ff0033",
  black: '#0e1111'
};

export const themeInit = () => {
  Colors.loadColors(colors);
  
  Typography.loadTypographies({
    h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
    h2: {fontSize: 46, fontWeight: '300', lineHeight: 64},
  });

  ThemeManager.setComponentTheme('Text', {
      green: true
  });
  ThemeManager.setComponentTheme('TextField', (props, context) => {
    return {
      errorColor: colors.errorColor,
      underlineColor: !props.error && colors.black,
      floatingPlaceholder: true
    };
  });
};