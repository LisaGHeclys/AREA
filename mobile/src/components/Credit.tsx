import React from 'react';
import {View, StyleSheet, Text, useColorScheme, Linking} from 'react-native';

import {Colors} from '../../Style';

const Styles = StyleSheet.create({
  container: {
    height: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 15,
    paddingRight: 10,
    paddingLeft: 10,
    borderTopWidth: 1,
    zIndex: 10,
  },
});

const Credit = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        Styles.container,
        {
          borderTopColor: isDarkMode ? Colors.minorD : Colors.minorW,
        },
      ]}>
      <Text
        style={{
          color: isDarkMode ? Colors.textDOpacity : Colors.textWOpacity,
        }}
        onPress={() => {
          Linking.openURL('https://salut.viken.fun');
        }}>
        Terms & Privacy
      </Text>
      <Text>0.1.2</Text>
    </View>
  );
};

export default Credit;
