/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigator from './src/common/Navigation/StackNavigator';
import { UserProvider } from './src/context/UserContext';
import { RootSiblingParent } from 'react-native-root-siblings';

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
    <RootSiblingParent>
      <UserProvider token={HueSToken}>
        <NavigationContainer theme={MyTheme}>
          <StackNavigator token={HueSToken} />
        </NavigationContainer>
      </UserProvider>
    </RootSiblingParent>
  );
}

export default App;
