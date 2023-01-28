import React, {useState} from 'react';
import {
  StyleSheet,
  useColorScheme,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';

import {faAt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Colors} from '../../../../Style';

import ButtonBack from '../../../components/buttons/ButtonBack';
import Separator from '../../../components/Separator';
import ForgotPasswordSvg from '../../../components/svg/ForgotPasswordSvg';
import Title from '../../../components/Title';

import ButtonForgotPasswd from './ButtonForgotPasswd';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerSvg: {
    marginTop: 30,
    alignItems: 'center',
  },
  text: {
    marginLeft: 35,
    marginBottom: 2,
    fontSize: 18,
    justifyContent: 'center',
    textAlignVertical: 'center',
    padding: 0,
    width: '80%',
  },
  containerInput: {
    marginTop: 25,
    marginLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBottom: {
    marginTop: 10,
    marginBottom: 15,
  },
});

const ForgotPassword = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');

  return (
    <ScrollView style={Styles.container}>
      <ButtonBack path={'Login'} />
      <View style={Styles.containerSvg}>
        <ForgotPasswordSvg />
      </View>
      <Title title={'Forgot' + '\n' + 'Password ?'} />
      <View style={Styles.text}>
        <Text
          style={[
            {
              color: isDarkMode ? Colors.textDOpacity : Colors.textWOpacity,
              textAlignVertical: 'center',
              fontSize: 18,
            },
          ]}>
          Don’t worry! it happens. Please enter the address associated with your
          account.
        </Text>
      </View>
      <View style={Styles.containerBottom}>
        <View style={Styles.containerInput}>
          <FontAwesomeIcon
            icon={faAt}
            size={20}
            color={isDarkMode ? Colors.textDOpacity : Colors.textWOpacity}
          />
          <TextInput
            style={Styles.text}
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
      <ButtonForgotPasswd title={'Submit'} width={160} email={email} />
    </ScrollView>
  );
};

export default ForgotPassword;
