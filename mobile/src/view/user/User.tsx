import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';

import {
  faInfoCircle,
  faPalette,
  faQuestionCircle,
  faStream,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';

import {Colors} from '../../../Style';

import Credit from '../../components/Credit';
import Navbar from '../../components/Navbar';
import ButtonParams from './ButtonParams';

import {getUser} from '../../apiCalls/UserCalls';

import LogOut from './LogOut';
import Profile from './Profile';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerParams: {
    height: '88%',
    justifyContent: 'space-between',
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const User = () => {
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
        {backgroundColor: isDarkMode ? Colors.backgroundD : Colors.backgroundW},
        Styles.container,
      ]}>
      <View style={Styles.containerParams}>
        <Profile email={user.email} />
        <ButtonParams
          icon={faUserCog}
          title={'My Profile'}
          component={'UserProfile'}
        />
        <ButtonParams icon={faPalette} title={'Appearance'} />
        <ButtonParams
          icon={faStream}
          title={'My Services'}
          component={'UserServices'}
        />
        <ButtonParams
          icon={faQuestionCircle}
          title={'Help Center'}
          component={'HelpCenter'}
        />
        <ButtonParams
          icon={faInfoCircle}
          title={'About AREA'}
          component={'AboutArea'}
        />
        <ButtonParams
          icon={faInfoCircle}
          title={'About Us'}
          component={'AboutUs'}
        />
        <LogOut />
      </View>
      <View style={Styles.end}>
        <Credit />
        <Navbar page={'User'} />
      </View>
    </View>
  );
};

export default User;
