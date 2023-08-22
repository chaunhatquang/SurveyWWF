/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import StackNavigator from './src/common/Navigation/StackNavigator';
import { UserContext, UserProvider } from './src/context/UserContext';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'white'
  },
};

function App(props: any): JSX.Element {
  const HueSToken = props.accountToken;
 
  return (
    <UserProvider token={HueSToken}>
      <NavigationContainer theme={MyTheme}>
        <StackNavigator token={HueSToken} />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
