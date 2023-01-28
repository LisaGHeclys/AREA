import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Pressable,
} from 'react-native';
import {Card} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';

import {
  faDiscord,
  faGoogle,
  faGoogleDrive,
  faTwitch,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faPlane,
  faUserCircle,
  faCalendar,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Colors} from '../../Style';

import Navbar from '../components/Navbar';
import TitleApp from '../components/TitleApp';
import SeparatorColor from '../components/SeparatorColor';

import {getAreas} from '../apiCalls/AreaCalls';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
    flexGrow: 1,
    paddingBottom: 15,
  },
  navbar: {
    flexGrow: 2,
    justifyContent: 'flex-end',
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
    marginTop: 20,
    paddingHorizontal: 24,
  },
  button: {
    height: 35,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  textButton: {
    color: Colors.textD,
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerArea: {
    display: 'flex',
    alignItems: 'center',
  },
  area: {
    margin: 8,
    height: 90,
    width: 300,
    borderRadius: 8,
  },
});

const actionLogoList: {
  logo: IconDefinition;
}[] = [
  {
    logo: faTwitter,
  },
  {
    logo: faTwitter,
  },
  {
    logo: faPlane,
  },
  {
    logo: faCalendar,
  },
  {
    logo: faGoogle,
  },
  {
    logo: faTwitch,
  },
  {
    logo: faTwitch,
  },
  {
    logo: faTwitch,
  },
  {
    logo: faGoogle,
  },
];

const reactionLogoList: {
  logo: IconDefinition;
}[] = [
  {
    logo: faGoogle,
  },
  {
    logo: faDiscord,
  },
  {
    logo: faCalendar,
  },
  {
    logo: faGoogleDrive,
  },
  {
    logo: faGoogle,
  },
  {
    logo: faTwitch,
  },
];

const Homepage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const [areas, setAreas] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(true);

  setInterval(() => {
    setForceRefresh(true);
  }, 120000);

  useEffect(() => {
    const fetchAreas = async () => {
      const areas = await getAreas();
      return areas;
    };
    fetchAreas().then(areas => {
      setAreas(areas);
    });
    setForceRefresh(false);
  }, [forceRefresh]);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={[
          {
            backgroundColor: isDarkMode
              ? Colors.backgroundD
              : Colors.backgroundW,
          },
          Styles.container,
        ]}>
        <View style={Styles.header}>
          <TitleApp title="Let's start !" path="" backbutton={false} />
          <Pressable
            onPress={() => {
              navigation.navigate('User');
            }}>
            <FontAwesomeIcon
              icon={faUserCircle}
              size={25}
              color={isDarkMode ? Colors.majorD : Colors.majorW}
            />
          </Pressable>
        </View>
        <SeparatorColor width={360} marginTop={0} marginLeft={0} />
        {!areas ? (
          <Text
            style={[
              {
                color: isDarkMode ? Colors.textD : Colors.textW,
              },
              Styles.textError,
            ]}>
            You have no action reaction for now, create one !
          </Text>
        ) : (
          areas.map((area: any, index: number) => {
            const params = JSON.parse(area.parameters);
            return (
              <View key={index} style={Styles.containerArea}>
                <Card
                  style={[
                    Styles.area,
                    {
                      backgroundColor: isDarkMode
                        ? Colors.majorDOpacity
                        : Colors.majorWOpacity,
                    },
                  ]}>
                  <Card.Content>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 2,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: isDarkMode ? Colors.textD : Colors.textW,
                        }}>
                        {area.name}
                      </Text>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <FontAwesomeIcon
                          icon={actionLogoList[params.action.id - 1].logo}
                          size={15}
                          color={isDarkMode ? Colors.textD : Colors.textW}
                        />
                        <FontAwesomeIcon
                          style={{marginLeft: 5}}
                          icon={reactionLogoList[params.reaction.id - 1].logo}
                          size={15}
                          color={isDarkMode ? Colors.textD : Colors.textW}
                        />
                      </View>
                    </View>

                    <Text
                      style={{
                        marginBottom: 5,
                        color: isDarkMode ? Colors.textD : Colors.textW,
                      }}>
                      {params.action.name + ' => ' + params.reaction.name}
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            );
          })
        )}
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
              },
              {
                width: 240,
              },
            ]}
            onPress={() => {
              navigation.navigate('Create');
              setForceRefresh(true);
            }}>
            <Text style={Styles.textButton}>Create an AREA</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View style={Styles.navbar}>
        <Navbar page={'Homepage'} />
      </View>
    </View>
  );
};

export default Homepage;
