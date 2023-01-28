import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../../Style';

import ButtonBack from '../../components/buttons/ButtonBack';
import ThisThenThatSvg from '../../components/svg/ThisThenThatSvg';
import Tutorial3Svg from '../../components/svg/Tutorial3Svg';
import Title from '../../components/Title';
import Separator from '../../components/Separator';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  containerSvg: {
    marginTop: 25,
    justifyContent: 'center',
  },
  containerSmallSvg: {
    marginTop: 25,
    alignItems: 'center',
  },
  circle: {
    height: 25,
    width: 25,
    marginLeft: 15,
    borderRadius: 50,
  },
  containerCircle: {
    display: 'flex',
    flexDirection: 'row',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    bottom: 25,
    justifyContent: 'space-between',
  },
});

const Tutorial1 = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  return (
    <View
      style={[
        {backgroundColor: isDarkMode ? Colors.backgroundD : Colors.backgroundW},
        Styles.container,
      ]}>
      <View style={Styles.header}>
        <ButtonBack path={'Tutorial2'} />
      </View>
      <View style={Styles.containerSvg}>
        <Tutorial3Svg />
      </View>
      <Title title="Trigger the process based on events" />
      <View style={Styles.containerSmallSvg}>
        <ThisThenThatSvg />
      </View>
      <View style={Styles.footer}>
        <View style={Styles.containerCircle}>
          <View
            style={[
              Styles.circle,
              {
                backgroundColor: isDarkMode
                  ? Colors.minorDOpacity
                  : Colors.minorWOpacity,
              },
            ]}
          />
          <View
            style={[
              Styles.circle,
              {
                backgroundColor: isDarkMode
                  ? Colors.minorDOpacity
                  : Colors.minorWOpacity,
              },
            ]}
          />
          <View
            style={[
              Styles.circle,
              {
                backgroundColor: isDarkMode ? Colors.minorD : Colors.minorW,
              },
            ]}
          />
        </View>
        <View style={{alignSelf: 'flex-end', alignContent: 'flex-end'}}>
          <Text
            style={{
              color: isDarkMode ? Colors.textD : Colors.textW,
              fontSize: 24,
              fontWeight: '600',
              letterSpacing: 0.9,
            }}
            onPress={() => {
              navigation.navigate('Homepage');
            }}>
            FINISH
          </Text>
          <Separator width={100} marginTop={5} marginLeft={0} />
        </View>
      </View>
    </View>
  );
};

export default Tutorial1;
