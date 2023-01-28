import React, {type PropsWithChildren} from 'react';
import {useColorScheme, Text, StyleSheet} from 'react-native';

import {Colors} from '../../Style';

const Styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    margin: 30,
    fontSize: 32,
    fontWeight: 'bold',
  },
});

const Title: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({title}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      style={[Styles.text, {color: isDarkMode ? Colors.textD : Colors.textW}]}>
      {title}
    </Text>
  );
};

export default Title;
