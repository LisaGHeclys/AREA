import React from 'react';
import {View, StyleSheet, Text, useColorScheme} from 'react-native';

import {Colors} from '../../../../Style';

import Credit from '../../../components/Credit';
import SeparatorColor from '../../../components/SeparatorColor';
import TitleApp from '../../../components/TitleApp';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  text: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 25,
    fontSize: 20,
    fontWeight: '600',
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const AboutArea = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        Styles.container,
        {
          backgroundColor: isDarkMode ? Colors.backgroundD : Colors.backgroundW,
        },
      ]}>
      <TitleApp title="About AREA" path="User" backbutton={true} />
      <SeparatorColor width={360} marginTop={0} marginLeft={0} />
      <Text
        style={[
          Styles.text,
          {color: isDarkMode ? Colors.textD : Colors.textW},
        ]}>
        AREA is third year Epitech Project to be carried out in a group of 4 to
        5 students.
      </Text>
      <Text
        style={[
          Styles.text,
          {color: isDarkMode ? Colors.textD : Colors.textW},
        ]}>
        The goal of this project is to make a dashboard-style web app to gather
        feeds from multiple external APIs and centralize them into one
        interface.
      </Text>
      <Text
        style={[
          Styles.text,
          {color: isDarkMode ? Colors.textD : Colors.textW},
        ]}>
        The project must implement a software suite that functions similar to
        that of IFTTT and/or Zapier.
      </Text>
      <Text
        style={[
          Styles.text,
          {color: isDarkMode ? Colors.textD : Colors.textW},
        ]}>
        {`This project is divided in tree parts:${'\n'}
        - Server application.
        - Web application to use your browser by querying the Server App.
        - Mobile application to use your application on your phone by querying the Server App.`}
      </Text>
      <View style={Styles.end}>
        <Credit />
      </View>
    </View>
  );
};

export default AboutArea;
