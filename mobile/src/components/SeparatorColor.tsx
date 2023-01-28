import React, {type PropsWithChildren} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';

import {Colors} from '../../Style';

const Styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const SeparatorColor: React.FC<
  PropsWithChildren<{
    width: number;
    marginTop: number;
    marginLeft: number;
  }>
> = ({width, marginTop, marginLeft}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        Styles.separator,
        {
          width: width,
          marginTop: marginTop,
          marginLeft: marginLeft,
          borderBottomColor: isDarkMode ? Colors.minorD : Colors.minorW,
        },
      ]}
    />
  );
};

export default SeparatorColor;
