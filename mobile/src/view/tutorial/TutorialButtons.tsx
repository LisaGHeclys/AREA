import React, {PropsWithChildren} from 'react';
import {useColorScheme, View, Text, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Colors} from '../../../Style';

const SkipButton = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      style={{color: isDarkMode ? Colors.textD : Colors.textW}}
      onPress={() => {
        navigation.navigate('Homepage');
      }}>
      Skip
    </Text>
  );
};

const ArrowButton: React.FC<
  PropsWithChildren<{
    path: string;
  }>
> = ({path}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{marginRight: 15}}>
      <Pressable
        onPress={() => {
          navigation.navigate(path);
        }}>
        <FontAwesomeIcon
          icon={faArrowAltCircleRight}
          size={50}
          color={isDarkMode ? Colors.textD : Colors.textW}
        />
      </Pressable>
    </View>
  );
};

export {SkipButton, ArrowButton};
