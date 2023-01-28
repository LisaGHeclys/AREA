import React, {PropsWithChildren, useState} from 'react';
import {Linking, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Dialog, Paragraph, Portal, Provider} from 'react-native-paper';

import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Colors} from '../../../../Style';

import {getItem} from '../../../components/storage/localStorage';

import {
  serviceSubscribe,
  serviceUnsubscribe,
} from '../../../apiCalls/ServicesCalls';

const Styles = StyleSheet.create({
  container: {
    margin: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dialogError: {
    justifyContent: 'center',
  },
  text: {
    paddingLeft: 50,
    fontSize: 18,
    fontWeight: '500',
  },
  textEnd: {
    fontSize: 18,
    fontWeight: '400',
  },
});

const Services: React.FC<
  PropsWithChildren<{
    service: {
      name: string;
      isSubbed: boolean;
      icon: IconDefinition;
    };
    index: number;
    setForceRefresh: any;
  }>
> = ({service, index, setForceRefresh}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(false);

  const [errorTwitch, setErrorTwitch] = useState(false);

  const hideDialog = () => setErrorTwitch(false);

  const openBrowser = (url: string) => {
    Linking.openURL(url);
  };

  const handleSubscribe: any = async () => {
    setIsLoading(true);
    const jwt = await getItem('jwt');
    let res;
    try {
      if (service.isSubbed) {
        res = await serviceUnsubscribe(index);
      } else {
        res = await serviceSubscribe(index);
      }
      if (res.error && res.errorCode === 'NO_GOOGLE_PROVIDER') {
        openBrowser(
          'http://area.eu-west-3.elasticbeanstalk.com/auth/google/provider',
        );
        return;
      }
      if (res.error && res.errorCode === 'NO_TWITCH_PROVIDER') {
        setErrorTwitch(true);
        // openBrowser(
        //   `http://area.eu-west-3.elasticbeanstalk.com/auth/twitch/${
        //     jwt?.split(`"`)[1]
        //   }/provider`,
        // );
        return;
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setForceRefresh(true);
    }
  };

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.containerTitle}>
          <FontAwesomeIcon
            icon={service.icon}
            size={25}
            color={isDarkMode ? Colors.majorD : Colors.majorW}
          />
          <Text
            style={[
              Styles.text,
              {color: isDarkMode ? Colors.textD : Colors.textW},
            ]}>
            {service.name}
          </Text>
        </View>
        <Text
          style={[
            Styles.textEnd,
            {color: isDarkMode ? Colors.minorD : Colors.minorW},
          ]}
          onPress={() => {
            handleSubscribe();
          }}>
          {service.isSubbed === true ? 'Unsubscribe' : 'Subscribe'}
        </Text>
      </View>
      <Provider>
        <View
          style={[
            {
              backgroundColor: isDarkMode
                ? Colors.backgroundD
                : Colors.backgroundW,
            },
          ]}>
          {errorTwitch === true ? (
            <Portal>
              <Dialog
                visible={errorTwitch}
                onDismiss={() => {
                  hideDialog();
                }}
                style={Styles.dialogError}>
                <Dialog.Content>
                  <Paragraph>
                    You can only register to Twitch on the website :/
                  </Paragraph>
                </Dialog.Content>
              </Dialog>
            </Portal>
          ) : (
            <></>
          )}
        </View>
      </Provider>
    </>
  );
};

export default Services;
