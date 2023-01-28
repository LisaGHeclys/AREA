import React from 'react';
import {View, StyleSheet, Text, useColorScheme, Pressable} from 'react-native';
import RNRestart from 'react-native-restart';

import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Colors} from '../../../Style';
import {removeItem} from '../../components/storage/localStorage';

const Styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    paddingLeft: 40,
  },
  text: {
    paddingLeft: 50,
    fontSize: 18,
    fontWeight: '500',
  },
});

const LogOut = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={Styles.container}>
      <Pressable
        onPress={() => {
          removeItem('isLoggedIn');
          removeItem('jwt');
          RNRestart.Restart();
        }}
        style={({pressed}) => [
          {
            backgroundColor: isDarkMode
              ? pressed
                ? Colors.textWOpacity
                : Colors.backgroundD
              : pressed
              ? Colors.textDOpacity
              : Colors.backgroundW,
          },
          Styles.container,
        ]}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          size={25}
          color={isDarkMode ? Colors.majorD : Colors.majorW}
        />
        <Text
          style={[
            Styles.text,
            {color: isDarkMode ? Colors.textD : Colors.textW},
          ]}>
          Log out
        </Text>
      </Pressable>
    </View>
  );
};

export default LogOut;
