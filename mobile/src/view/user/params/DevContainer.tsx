import React, {PropsWithChildren} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Image,
  Linking,
} from 'react-native';

import {Colors} from '../../../../Style';

const Styles = StyleSheet.create({
  titlePart: {
    textAlign: 'left',
    margin: 10,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textName: {
    textAlign: 'center',
    margin: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  containerPart: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  verticalLine: {
    height: 120,
    width: 1,
    fontWeight: '800',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  person: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const DevContainer: React.FC<
  PropsWithChildren<{
    title: string;
    person1: {
      name: string;
      image: number;
    };
    person2?: {
      name: string;
      image: number;
    };
  }>
> = ({title, person1, person2}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const pdp = [
    require('../../../assets/maxence.pellouin@epitech.eu.jpg'),
    require('../../../assets/laurent.cazette@epitech.eu.jpg'),
    require('../../../assets/justine.trupheme@epitech.eu.jpg'),
    require('../../../assets/florian.gibault@epitech.eu.jpg'),
    require('../../../assets/lisa.glaziou@epitech.eu.jpg'),
  ];
  const link = [
    'https://github.com/mpellouin',
    'https://github.com/Laurent-cazette',
    'https://github.com/Flackho',
    'https://github.com/Fgib',
    'https://github.com/LisaGHeclys',
  ];

  return (
    <View>
      <Text
        style={[
          Styles.titlePart,
          {color: isDarkMode ? Colors.textD : Colors.textW, fontSize: 18},
        ]}>
        {title}
      </Text>
      <View style={Styles.containerPart}>
        <View style={Styles.person}>
          <Image style={Styles.image} source={pdp[person1.image]} />
          <Text
            style={[
              Styles.textName,
              {color: isDarkMode ? Colors.textD : Colors.textW, fontSize: 18},
            ]}
            onPress={() => {
              Linking.openURL(link[person1.image]);
            }}>
            {person1.name}
          </Text>
        </View>
        {person2 ? (
          <>
            <View
              style={[
                Styles.verticalLine,
                {
                  backgroundColor: isDarkMode
                    ? Colors.minorDOpacity
                    : Colors.minorWOpacity,
                },
              ]}
            />
            <View style={Styles.person}>
              <Image style={Styles.image} source={pdp[person2.image]} />
              <Text
                style={[
                  Styles.textName,
                  {
                    color: isDarkMode ? Colors.textD : Colors.textW,
                    fontSize: 18,
                  },
                ]}
                onPress={() => {
                  Linking.openURL(link[person2.image]);
                }}>
                {person2.name}
              </Text>
            </View>
          </>
        ) : (
          <View style={{width: 120}}></View>
        )}
      </View>
    </View>
  );
};

export default DevContainer;
