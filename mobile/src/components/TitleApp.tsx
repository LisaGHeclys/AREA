import React, {type PropsWithChildren} from 'react';
import {useColorScheme, Text, StyleSheet, View} from 'react-native';

import {Colors} from '../../Style';

import ButtonBack from './buttons/ButtonBack';

const Styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
  },
  text: {
    textAlign: 'left',
    margin: 15,
    fontSize: 26,
    fontWeight: 'bold',
  },
});

const Title: React.FC<
  PropsWithChildren<{
    title: string;
    path: string;
    backbutton: boolean;
  }>
> = ({title, path, backbutton}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={Styles.title}>
      {backbutton === true ? <ButtonBack path={path} /> : ''}
      <Text
        style={[
          Styles.text,
          {color: isDarkMode ? Colors.textD : Colors.textW},
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default Title;
