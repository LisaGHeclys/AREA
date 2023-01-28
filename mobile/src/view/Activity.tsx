import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Pressable,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../Style';

import Navbar from '../components/Navbar';
import TitleApp from '../components/TitleApp';
import SeparatorColor from '../components/SeparatorColor';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textError: {
    marginTop: 15,
    textAlign: 'center',
  },
  containerButton: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 20,
    paddingHorizontal: 24,
  },
  button: {
    height: 35,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: 240,
  },
  textButton: {
    color: Colors.textD,
    fontSize: 18,
    fontWeight: 'bold',
  },
  navbar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const Activity = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const [list, setList] = useState(undefined);

  return (
    <>
      <ScrollView
        style={[
          {
            backgroundColor: isDarkMode
              ? Colors.backgroundD
              : Colors.backgroundW,
          },
          Styles.container,
        ]}>
        <TitleApp
          title="See all your activities here !"
          path=""
          backbutton={false}
        />
        <SeparatorColor width={360} marginTop={0} marginLeft={0} />
        {!list ? (
          <>
            <Text
              style={[
                {
                  color: isDarkMode ? Colors.textD : Colors.textW,
                },
                Styles.textError,
              ]}>
              You have no activity for now, create an action reaction !
            </Text>
            <View style={Styles.containerButton}>
              <Pressable
                style={({pressed}) => [
                  Styles.button,
                  {
                    backgroundColor: isDarkMode
                      ? pressed
                        ? Colors.majorDOpacity
                        : Colors.majorD
                      : pressed
                      ? Colors.majorWOpacity
                      : Colors.majorW,
                    shadowColor: isDarkMode ? Colors.textD : Colors.textW,
                  },
                ]}
                onPress={() => {
                  navigation.navigate('Create');
                }}>
                <Text style={Styles.textButton}>Create an AREA</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
      <View style={Styles.navbar}>
        <Navbar page={'Activity'} />
      </View>
    </>
  );
};

export default Activity;
