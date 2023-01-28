import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import RNRestart from 'react-native-restart';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAt, faUnlock} from '@fortawesome/free-solid-svg-icons';

import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../../../Style';

import Title from '../../../components/Title';
import Separator from '../../../components/Separator';
import LoginSvg from '../../../components/svg/LoginSvg';
import {getItem, setItem} from '../../../components/storage/localStorage';

import {loginUser} from '../../../apiCalls/UserCalls';

import AuthLogin from './AuthLogin';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerSvg: {
    marginTop: 25,
    alignItems: 'center',
  },
  containerAuth: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  containerRectangle: {
    width: 70,
    height: 35,
    borderRadius: 8,
    borderWidth: 1,
  },
  containerInput: {
    marginLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerButton: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 24,
  },
  buttonStyle: {
    height: 35,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  textStyle: {
    color: Colors.textD,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginLeft: 35,
    marginBottom: 2,
    fontSize: 18,
    justifyContent: 'center',
    textAlignVertical: 'center',
    padding: 0,
    width: '80%',
  },
  forgotPasswordInput: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    textAlign: 'right',
    paddingRight: 35,
  },
  separator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
  },
  registerInput: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
});

const Login = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await loginUser({email, password});
      console.log(res.access_token);
      if (res.access_token) {
        setItem('isLoggedIn', 'true');
        setItem('jwt', res.access_token);
      } else {
        setEmail('');
        setPwd('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      getItem('isLoggedIn')
        .then(data => data)
        .then(value => {
          if (value !== null) {
            setIsLoggedIn(true);
          } else setIsLoggedIn(false);
        });
      setIsLoading(false);
      isLoggedIn === true ? RNRestart.Restart() : '';
    }
  };

  return (
    <ScrollView style={Styles.container}>
      <View style={Styles.containerSvg}>
        <LoginSvg />
      </View>
      <Title title="Login" />
      <View>
        <View style={Styles.containerInput}>
          <FontAwesomeIcon
            icon={faAt}
            size={20}
            color={isDarkMode ? Colors.textDOpacity : Colors.textWOpacity}
          />
          <TextInput
            style={Styles.input}
            placeholder="Email ID*"
            placeholderTextColor={
              isDarkMode ? Colors.textDOpacity : Colors.textWOpacity
            }
            onChangeText={newEmail => {
              setEmail(newEmail);
            }}
            maxLength={28}
          />
        </View>
        <Separator marginTop={10} marginLeft={45} width={270} />
      </View>
      <View>
        <View style={Styles.containerInput}>
          <FontAwesomeIcon
            icon={faUnlock}
            size={20}
            color={isDarkMode ? Colors.textDOpacity : Colors.textWOpacity}
          />
          <TextInput
            style={Styles.input}
            placeholder="Password*"
            placeholderTextColor={
              isDarkMode ? Colors.textDOpacity : Colors.textWOpacity
            }
            onChangeText={newPwd => {
              setPwd(newPwd);
            }}
            secureTextEntry={true}
            maxLength={32}
          />
        </View>
        <Separator marginTop={10} marginLeft={45} width={270} />
        <Text
          style={[
            Styles.forgotPasswordInput,
            {color: isDarkMode ? Colors.majorD : Colors.majorW},
          ]}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          Forgot Password ?
        </Text>
      </View>
      <View style={Styles.containerButton}>
        <Pressable
          style={({pressed}) => [
            Styles.buttonStyle,
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
              width: 160,
            },
          ]}
          onPress={() => {
            handleLogin();
          }}>
          <Text style={Styles.textStyle}>Login</Text>
        </Pressable>
      </View>
      <View style={Styles.separator}>
        <Separator marginTop={15} marginLeft={0} width={137.5} />
        <Text
          style={{
            color: isDarkMode ? Colors.textD : Colors.textW,
            textAlignVertical: 'center',
          }}>
          OR
        </Text>
        <Separator marginTop={15} marginLeft={0} width={137.5} />
      </View>
      <View style={Styles.containerAuth}>
        <View>
          <AuthLogin title={'Google'} />
        </View>
        <View>
          <AuthLogin title={'Github'} />
        </View>
        <View>
          <AuthLogin title={'Twitter'} />
        </View>
      </View>
      <View style={Styles.registerInput}>
        <Text
          style={{
            color: isDarkMode ? Colors.textD : Colors.textW,
            textAlignVertical: 'center',
          }}>
          New to AREA ?
          <Text
            style={{color: isDarkMode ? Colors.majorD : Colors.majorW}}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            {' '}
            Register
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;
