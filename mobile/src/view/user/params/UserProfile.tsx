import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {TextInput} from 'react-native-paper';

import {Colors} from '../../../../Style';

import {getUser} from '../../../apiCalls/UserCalls';

import Credit from '../../../components/Credit';
import SeparatorColor from '../../../components/SeparatorColor';
import TitleApp from '../../../components/TitleApp';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerUser: {
    margin: 20,
    marginBottom: 28,
    alignItems: 'center',
    display: 'flex',
  },
  textInput: {
    height: 50,
    marginTop: 8,
    width: '80%',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const UserProfile = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState({
    ID: '',
    customToken: '',
    email: '',
    googleID: '',
    password: '',
    services: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      return user[0];
    };
    fetchUser().then(user => {
      setUser(user);
    });
  }, []);

  return (
    <View
      style={[
        {
          backgroundColor: isDarkMode ? Colors.backgroundD : Colors.backgroundW,
        },
        Styles.container,
      ]}>
      <TitleApp title="My Profile" path="User" backbutton={true} />
      <SeparatorColor width={360} marginTop={0} marginLeft={0} />
      <View style={Styles.containerUser}>
        <TextInput
          mode="flat"
          style={[
            Styles.textInput,
            {
              backgroundColor: isDarkMode ? Colors.textW : Colors.textD,
              color: isDarkMode ? '#A9A9A9' : Colors.textWOpacity,
            },
          ]}
          label="Email"
          disabled={true}
          value={user.email}
        />
        <TextInput
          mode="flat"
          style={[
            Styles.textInput,
            {
              backgroundColor: isDarkMode ? Colors.textW : Colors.textD,
              color: isDarkMode ? '#A9A9A9' : Colors.textWOpacity,
            },
          ]}
          label="User ID"
          disabled={true}
          value={user.ID.toString()}
        />
        <TextInput
          mode="flat"
          style={[
            Styles.textInput,
            {
              backgroundColor: isDarkMode ? Colors.textW : Colors.textD,
              color: isDarkMode ? '#A9A9A9' : Colors.textWOpacity,
            },
          ]}
          label="Password"
          disabled={true}
          secureTextEntry
          value={user.password}
          editable={false}
        />
      </View>
      <SeparatorColor width={300} marginTop={0} marginLeft={0} />
      <View style={Styles.containerUser}>
        <TextInput
          mode="flat"
          style={[
            Styles.textInput,
            {
              backgroundColor: isDarkMode ? Colors.textW : Colors.textD,
              color: isDarkMode ? '#A9A9A9' : Colors.textWOpacity,
            },
          ]}
          label="Number of subscribed Services"
          disabled={true}
          value={user.services === '' ? '0' : user.services.length.toString()}
        />
      </View>
      <View style={Styles.end}>
        <Credit />
      </View>
    </View>
  );
};

export default UserProfile;
