import {StyleSheet} from 'react-native';

export const Colors = {
  backgroundW: '#F8F5F2',
  backgroundD: '#16161A',
  majorW: '#078080',
  majorWOpacity: 'rgba(7, 128, 128, 0.5)',
  majorD: '#7F5AF0',
  majorDOpacity: 'rgba(127, 90, 240, 0.5)',
  minorW: '#F45D48',
  minorWOpacity: 'rgba(244, 93, 72, 0.5)',
  minorD: '#2CB67D',
  minorDOpacity: 'rgba(44, 182, 125, 0.5)',
  textW: '#222525',
  textWOpacity: 'rgba(34, 37, 37, 0.8)',
  textD: '#FFFFFE',
  textDOpacity: 'rgba(255, 255, 254, 0.8)',
};

export const Styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
