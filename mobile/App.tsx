import React, {useEffect, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Colors} from './Style';

import Login from './src/view/signFiles/login/Login';
import Register from './src/view/signFiles/register/Register';
import ForgotPassword from './src/view/signFiles/forgotPasswd/ForgotPassword';
import ResetPassword from './src/view/signFiles/resetPasswd/ResetPassword';

import Homepage from './src/view/Homepage';
import Create from './src/view/create/Create';
import Activity from './src/view/Activity';
import linking from './src/view/signFiles/linking';
import User from './src/view/user/User';

import Tutorial1 from './src/view/tutorial/Tutorial1';
import Tutorial2 from './src/view/tutorial/Tutorial2';
import Tutorial3 from './src/view/tutorial/Tutorial3';

import UserProfile from './src/view/user/params/UserProfile';
import UserServices from './src/view/user/params/UserServices';
import HelpCenter from './src/view/user/params/HelpCenter';
import AboutArea from './src/view/user/params/AboutArea';
import AboutUs from './src/view/user/params/AboutUs';

import {getItem} from './src/components/storage/localStorage';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const isTutorial = undefined;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getItem('isLoggedIn')
      .then(data => data)
      .then(value => {
        if (value !== null) {
          setIsLoggedIn(true);
        } else setIsLoggedIn(false);
      });
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.backgroundD : Colors.backgroundW}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoggedIn === false ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        ) : isTutorial ? (
          <>
            <Stack.Screen
              name="Tutorial1"
              component={Tutorial1}
              options={{
                animation: 'fade_from_bottom',
              }}
            />
            <Stack.Screen
              name="Tutorial2"
              component={Tutorial2}
              options={{
                animation: 'fade_from_bottom',
              }}
            />
            <Stack.Screen
              name="Tutorial3"
              component={Tutorial3}
              options={{
                animation: 'fade_from_bottom',
                gestureEnabled: false,
                headerLeft: () => <></>,
                headerBackVisible: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Homepage"
              component={Homepage}
              options={{
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Create"
              component={Create}
              options={{
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Activity"
              component={Activity}
              options={{
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="User"
              component={User}
              options={{
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="UserServices"
              component={UserServices}
              options={{
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="HelpCenter"
              component={HelpCenter}
              options={{
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="AboutArea"
              component={AboutArea}
              options={{
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{
                animation: 'none',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
