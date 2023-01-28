import React, {type PropsWithChildren} from 'react';
import {View, StyleSheet, useColorScheme, Pressable} from 'react-native';

import {
  faBars,
  faCirclePlus,
  faCircleUser,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../Style';

const Styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Navbar: React.FC<
  PropsWithChildren<{
    page: string;
  }>
> = ({page}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        Styles.container,
        {backgroundColor: isDarkMode ? Colors.textW : Colors.textD},
      ]}>
      <View style={Styles.icon}>
        <Pressable
          onPress={() => {
            navigation.navigate('Homepage');
          }}>
          <FontAwesomeIcon
            icon={faBars}
            size={25}
            color={
              isDarkMode
                ? page == 'Homepage'
                  ? Colors.minorD
                  : Colors.majorD
                : page === 'Homepage'
                ? Colors.minorW
                : Colors.majorW
            }
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Create');
          }}>
          <FontAwesomeIcon
            icon={faCirclePlus}
            size={25}
            color={
              isDarkMode
                ? page == 'Create'
                  ? Colors.minorD
                  : Colors.majorD
                : page === 'Create'
                ? Colors.minorW
                : Colors.majorW
            }
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Activity');
          }}>
          <FontAwesomeIcon
            icon={faLayerGroup}
            size={25}
            color={
              isDarkMode
                ? page == 'Activity'
                  ? Colors.minorD
                  : Colors.majorD
                : page === 'Activity'
                ? Colors.minorW
                : Colors.majorW
            }
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('User');
          }}>
          <FontAwesomeIcon
            icon={faCircleUser}
            size={25}
            color={
              isDarkMode
                ? page == 'User'
                  ? Colors.minorD
                  : Colors.majorD
                : page === 'User'
                ? Colors.minorW
                : Colors.majorW
            }
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Navbar;
