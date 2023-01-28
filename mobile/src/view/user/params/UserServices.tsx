import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';

import {
  faDiscord,
  faGoogle,
  faTwitch,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faPlane,
  faCalendar,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import {Colors} from '../../../../Style';

import Credit from '../../../components/Credit';
import SeparatorColor from '../../../components/SeparatorColor';
import TitleApp from '../../../components/TitleApp';

import {getUser} from '../../../apiCalls/UserCalls';
import {updateProvider} from '../../../apiCalls/ProviderCalls';
import {serviceSubscribe} from '../../../apiCalls/ServicesCalls';

import Services from './Services';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerParams: {
    justifyContent: 'space-between',
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const servicesList: {
  name: string;
  isSubbed: boolean;
  icon: IconDefinition;
}[] = [
  {
    name: 'Discord',
    isSubbed: false,
    icon: faDiscord,
  },
  {
    name: 'Twitter',
    isSubbed: false,
    icon: faTwitter,
  },
  {
    name: 'Gmail',
    isSubbed: false,
    icon: faGoogle,
  },
  {
    name: 'Google Calendar',
    isSubbed: false,
    icon: faCalendar,
  },
  {
    name: 'Flight Tracker',
    isSubbed: false,
    icon: faPlane,
  },
  {
    name: 'Twitch',
    isSubbed: false,
    icon: faTwitch,
  },
];

const UserServices = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [services, setServices] = useState(servicesList);
  const [forceRefresh, setForceRefresh] = useState(true);

  Linking.addEventListener('url', handleUrl);

  async function handleUrl(event: {url: string; param: string}) {
    try {
      const jwt = await getSearchParamFromURL(event.url, 'token');
      const provider = await getSearchParamFromURL(event.url, 'provider');
      const refresh = await getSearchParamFromURL(event.url, 'refresh');
      if (jwt !== null && provider !== null && refresh !== null) {
        await updateProvider(provider, jwt, refresh);
        if (provider === 'google') {
          await serviceSubscribe(2);
          await serviceSubscribe(3);
        }
        setForceRefresh(true);
        Linking.removeAllListeners('url');
      } else {
        if (provider === 'twitch') {
          await serviceSubscribe(5);
          setForceRefresh(true);
          Linking.removeAllListeners('url');
          return;
        }
        Alert.alert('An error occured while providing you');
      }
    } catch (err) {
      throw 'An error occured: ' + err;
    }
  }

  const getSearchParamFromURL = (url: string, param: string) => {
    const include = url.includes(param);
    if (!include) return null;
    const params = url.split(/([?,=])/);
    const index = params.indexOf(param);
    const value = params[index + 2];
    return value;
  };

  useEffect(() => {
    if (!forceRefresh) return;
    setForceRefresh(false);
    const fetchServices = async () => {
      const response = await getUser();
      const user = response[0];
      const newServices = services.map((service, i) => {
        if (user?.services.includes(i)) service.isSubbed = true;
        else service.isSubbed = false;
        return service;
      });
      return newServices;
    };
    const newServices = fetchServices();
    newServices.then(newServices => {
      setServices(newServices);
    });
  }, [forceRefresh, services]);

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
        <TitleApp title="My Services" path="User" backbutton={true} />
        <SeparatorColor width={360} marginTop={0} marginLeft={0} />
        <View style={Styles.containerParams}>
          {services.map(
            (
              service: {
                name: string;
                isSubbed: boolean;
                icon: IconDefinition;
              },
              index: number,
            ) => {
              return (
                <Fragment key={index}>
                  <Services
                    service={service}
                    index={index}
                    setForceRefresh={setForceRefresh}
                  />
                </Fragment>
              );
            },
          )}
        </View>
      </ScrollView>
      <View style={Styles.end}>
        <Credit />
      </View>
    </>
  );
};

export default UserServices;
