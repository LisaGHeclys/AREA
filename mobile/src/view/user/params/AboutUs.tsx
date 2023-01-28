import React from 'react';
import {View, Text, StyleSheet, useColorScheme, ScrollView} from 'react-native';

import {Colors} from '../../../../Style';

import SeparatorColor from '../../../components/SeparatorColor';
import Credit from '../../../components/Credit';
import TitleApp from '../../../components/TitleApp';
import DevContainer from './DevContainer';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  text: {
    textAlign: 'center',
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const AboutUs = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <ScrollView
        style={[
          Styles.container,
          {
            backgroundColor: isDarkMode
              ? Colors.backgroundD
              : Colors.backgroundW,
          },
        ]}>
        <TitleApp title="About Us" path="User" backbutton={true} />
        <Text
          style={[
            Styles.text,
            {color: isDarkMode ? Colors.majorD : Colors.majorW},
          ]}>
          ON AREA LA
        </Text>
        <SeparatorColor width={360} marginLeft={0} marginTop={0} />
        <DevContainer
          title="Back-End | API | Database:"
          person1={{
            name: 'Maxence Pellouin',
            image: 0,
          }}
          person2={{
            name: 'Laurent Cazette',
            image: 1,
          }}
        />
        <DevContainer
          title="Web Application:"
          person1={{
            name: 'Justine Trupheme',
            image: 2,
          }}
          person2={{
            name: 'Florian Gibault',
            image: 3,
          }}
        />
        <DevContainer
          title="Mobile Application:"
          person1={{
            name: 'Lisa Glaziou',
            image: 4,
          }}
        />
      </ScrollView>
      <View style={Styles.end}>
        <Credit />
      </View>
    </>
  );
};

export default AboutUs;
