import React, {type PropsWithChildren} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';

import {Colors} from '../../Style';

const Styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const Separator: React.FC<
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
          borderBottomColor: isDarkMode ? '#A9A9A9' : Colors.textWOpacity,
        },
      ]}
    />
  );
};

export default Separator;
