import React from 'react';
import {StyleSheet, useColorScheme, View, Text} from 'react-native';

import {Colors} from '../../../Style';

import ButtonBack from '../../components/buttons/ButtonBack';
import Tutorial1Svg from '../../components/svg/Tutorial1Svg';
import Title from '../../components/Title';

import {ArrowButton, SkipButton} from './TutorialButtons';

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
  text: {
    marginLeft: 35,
    marginBottom: 2,
    fontSize: 18,
    justifyContent: 'center',
    textAlignVertical: 'center',
    padding: 0,
    width: '80%',
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

  return (
    <View
      style={[
        {backgroundColor: isDarkMode ? Colors.backgroundD : Colors.backgroundW},
        Styles.container,
      ]}>
      <View style={Styles.header}>
        <ButtonBack path={'Homepage'} />
        <SkipButton />
      </View>
      <View style={Styles.containerSvg}>
        <Tutorial1Svg />
      </View>
      <Title title="You can find a list of all your services" />
      <View style={Styles.text}>
        <Text
          style={[
            {
              color: isDarkMode ? Colors.textDOpacity : Colors.textWOpacity,
              textAlignVertical: 'center',
              fontSize: 18,
              fontWeight: '700',
            },
          ]}>
          All your services in the same place.
        </Text>
      </View>
      <View style={Styles.footer}>
        <View style={Styles.containerCircle}>
          <View
            style={[
              Styles.circle,
              {
                backgroundColor: isDarkMode ? Colors.minorD : Colors.minorW,
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
                backgroundColor: isDarkMode
                  ? Colors.minorDOpacity
                  : Colors.minorWOpacity,
              },
            ]}
          />
        </View>
        <ArrowButton path={'Tutorial2'} />
      </View>
    </View>
  );
};

export default Tutorial1;
