import React, {type PropsWithChildren} from 'react';
import {useColorScheme, View, Pressable} from 'react-native';

import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../../Style';

const ButtonBack: React.FC<
  PropsWithChildren<{
    path: string;
  }>
> = ({path}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{margin: 15}}>
      <Pressable
        onPress={() => {
          navigation.navigate(path);
        }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={25}
          color={isDarkMode ? Colors.majorD : Colors.majorW}
        />
      </Pressable>
    </View>
  );
};

export default ButtonBack;
