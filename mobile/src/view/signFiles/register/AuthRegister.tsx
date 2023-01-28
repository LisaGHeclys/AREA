import React, {useState} from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import RNRestart from 'react-native-restart';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

import {Colors} from '../../../../Style';

import GoogleSvg from '../../../components/svg/GoogleSvg';
import TwitterSvg from '../../../components/svg/TwitterSvg';
import {setItem} from '../../../components/storage/localStorage';

const Styles = StyleSheet.create({
  container: {
    width: 70,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
});

type AppProps = {
  title: string;
};

const AuthRegister = ({title}: AppProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isPressed, setIsPressed] = useState(false);

  const IconChoice = (name: string) => {
    switch (name) {
      case 'Google':
        return <GoogleSvg />;
      case 'Github':
        return (
          <FontAwesomeIcon
            icon={faGithub}
            size={30}
            color={isDarkMode ? Colors.textD : Colors.textW}
          />
        );
      case 'Twitter':
        return <TwitterSvg />;
    }
  };

  Linking.addEventListener('url', handleUrl);

  async function handleUrl(event: {url: string; param: string}) {
    try {
      const jwt = await getSearchParamFromURL(event.url, 'token');
      if (jwt != null) {
        setItem('isLoggedIn', 'True');
        setItem(`jwt`, jwt);
        RNRestart.Restart();
        Linking.removeAllListeners('url');
      } else {
        Alert.alert('An error occured while signin you');
      }
    } catch (err) {
      throw 'An error occured: ' + err;
    }
  }

  const openBrowser = (url: string) => {
    Linking.openURL(url);
  };

  const getSearchParamFromURL = (url: string, param: string) => {
    const include = url.includes(param);
    if (!include) return null;
    const params = url.split(/([?,=])/);
    const index = params.indexOf(param);
    const value = params[index + 2];
    return value;
  };

  return (
    <Pressable
      onPress={() => {
        setIsPressed(!isPressed);
        openBrowser(`http://area.eu-west-3.elasticbeanstalk.com/auth/${title}`);
      }}>
      <View
        style={[
          Styles.container,
          {
            borderColor: isDarkMode
              ? isPressed
                ? Colors.minorD
                : '#A9A9A9'
              : isPressed
              ? Colors.minorW
              : Colors.textW,
          },
        ]}>
        {IconChoice(title)}
      </View>
    </Pressable>
  );
};

export default AuthRegister;
