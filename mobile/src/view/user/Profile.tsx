import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, Text, useColorScheme} from 'react-native';

import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Colors} from '../../../Style';

const Styles = StyleSheet.create({
  container: {
    height: 240,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const Profile: React.FC<
  PropsWithChildren<{
    email: string;
  }>
> = ({email}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        Styles.container,
        {backgroundColor: isDarkMode ? Colors.textW : Colors.textD},
      ]}>
      <FontAwesomeIcon
        icon={faUserCircle}
        size={100}
        color={isDarkMode ? Colors.majorD : Colors.majorW}
      />
      <Text
        style={[
          Styles.text,
          {color: isDarkMode ? Colors.textD : Colors.textW},
        ]}>
        {email}
      </Text>
    </View>
  );
};

export default Profile;
