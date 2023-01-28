import React, {type PropsWithChildren} from 'react';
import {useColorScheme, View, StyleSheet, Pressable, Text} from 'react-native';

import {Colors} from '../../../../Style';

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 24,
  },
  buttonStyle: {
    height: 35,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  textStyle: {
    color: Colors.textD,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const ButtonForgotPasswd: React.FC<
  PropsWithChildren<{
    email: string;
    width: number;
    title: string;
  }>
> = ({width, email, title}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={Styles.container}>
      <Pressable
        style={({pressed}) => [
          Styles.buttonStyle,
          {
            backgroundColor: isDarkMode
              ? pressed
                ? Colors.majorDOpacity
                : Colors.majorD
              : pressed
              ? Colors.majorWOpacity
              : Colors.majorW,
          },
          {
            width: width,
          },
        ]}
        onPress={() => {
          console.log(email);
        }}>
        <Text style={Styles.textStyle}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default ButtonForgotPasswd;
