import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {faLock, faUnlock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Colors} from '../../../../Style';

import ButtonBack from '../../../components/buttons/ButtonBack';
import Separator from '../../../components/Separator';
import ResetPasswordSvg from '../../../components/svg/ResetPasswordSvg';
import Title from '../../../components/Title';

import ButtonResetPasswd from './ButtonResetPasswd';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerSvg: {
    marginTop: 25,
    alignItems: 'center',
  },
  containerInput: {
    marginTop: 20,
    marginLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  containerBottom: {
    marginTop: 0,
    marginBottom: 15,
  },
});

const ResetPassword = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <ScrollView style={Styles.container}>
      <ButtonBack path="Login" />
      <View style={Styles.containerSvg}>
        <ResetPasswordSvg />
      </View>
      <Title title={'Reset' + '\n' + 'Password'} />
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
            maxLength={35}
          />
        </View>
        <Separator marginTop={10} marginLeft={45} width={270} />
      </View>
      <View style={Styles.containerBottom}>
        <View style={Styles.containerInput}>
          <FontAwesomeIcon
            icon={faLock}
            size={20}
            color={isDarkMode ? Colors.textDOpacity : Colors.textWOpacity}
          />
          <TextInput
            style={Styles.input}
            placeholder="Confirm password*"
            placeholderTextColor={
              isDarkMode ? Colors.textDOpacity : Colors.textWOpacity
            }
            onChangeText={newConfirmPwd => {
              setConfirm(newConfirmPwd);
            }}
            secureTextEntry={true}
            maxLength={32}
          />
        </View>
        <Separator marginTop={10} marginLeft={45} width={270} />
      </View>
      <ButtonResetPasswd
        title={'Submit'}
        width={160}
        pwd={pwd}
        confirm={confirm}
      />
    </ScrollView>
  );
};

export default ResetPassword;
