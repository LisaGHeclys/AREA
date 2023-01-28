import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  Dialog,
  Menu,
  Paragraph,
  Portal,
  Provider,
  TextInput,
} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../../Style';

import Navbar from '../../components/Navbar';
import TitleApp from '../../components/TitleApp';
import SeparatorColor from '../../components/SeparatorColor';
import {getItem} from '../../components/storage/localStorage';

import {getUser} from '../../apiCalls/UserCalls';
import {createArea, getAreas} from '../../apiCalls/AreaCalls';

import {actionsList, reactionsList} from './AreaParams';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
    flexGrow: 2,
    paddingBottom: 15,
  },
  text: {
    margin: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },
  containerButton: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 30,
    height: 100,
    zIndex: 5,
  },
  containerMenu: {
    zIndex: 5,
    height: 120,
  },
  containerInput: {
    height: 50,
    marginTop: 8,
    width: '80%',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  button: {
    height: 50,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 260,
  },
  textButton: {
    color: Colors.textD,
    fontSize: 22,
    fontWeight: 'bold',
  },
  dialogError: {
    justifyContent: 'center',
  },
  navbar: {
    flexGrow: 3,
    justifyContent: 'flex-end',
  },
});

const Create = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const [visibleAction, setVisibleAction] = useState(false);
  const [visibleReaction, setVisibleReaction] = useState(false);

  const [name, setName] = useState('');

  const [action, setAction] = useState<{
    id: number;
    name: string;
    serviceId: number;
    params: {
      placeholder: string;
      name: string;
      type?: string;
    }[];
  }>({
    id: 0,
    name: '',
    serviceId: 0,
    params: [
      {
        placeholder: '',
        name: '',
        type: '',
      },
    ],
  });

  const [reaction, setReaction] = useState<{
    id: number;
    name: string;
    serviceId: number;
    params: {
      placeholder: string;
      name: string;
      type?: string;
    }[];
  }>({
    id: 0,
    name: '',
    serviceId: 0,
    params: [
      {
        placeholder: '',
        name: '',
        type: '',
      },
    ],
  });

  const [actionParams, setActionParams] = useState<{[key: string]: string}>({});
  const [reactionParams, setReactionParams] = useState<{[key: string]: string}>(
    {},
  );

  const [error, setError] = useState(false);
  const [errorService, setErrorService] = useState(false);
  const [errorArea, setErrorArea] = useState(false);

  const [dialog, setDialog] = useState(false);

  const [forceRefresh, setForceRefresh] = useState(true);

  const [areas, setAreas] = useState([]);
  const [user, setUser] = useState({
    ID: '',
    customToken: '',
    email: '',
    googleID: '',
    password: '',
    services: '',
  });

  const hideDialog = (text: string) => {
    switch (text) {
      case 'area':
        setErrorArea(false);
        break;
      case 'service':
        setErrorService(false);
        break;
      case 'dialog':
        setDialog(false);
        break;
      default:
        setError(false);
        break;
    }
  };

  const openMenu = (type: string) => {
    type === 'action' ? setVisibleAction(true) : setVisibleReaction(true);
  };

  const closeMenu = (type: string) => {
    type === 'action' ? setVisibleAction(false) : setVisibleReaction(false);
  };

  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    if (!forceRefresh) return;
    if (getItem('jwt') === null) return;
    const fetchAreas = async () => {
      try {
        const res = await getAreas();
        return res;
      } catch (error) {
        console.log(error);
      }
    };
    fetchAreas().then(res => {
      setAreas(res);
    });
    setForceRefresh(false);
  }, [forceRefresh]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      return user[0];
    };
    fetchUser().then(user => {
      setUser(user);
      setForceRefresh(true);
    });
  }, []);

  const submitArea = async () => {
    closeMenu('action');
    closeMenu('reaction');
    setName('');
    const jwt = await getItem('jwt');
    const area = {
      action,
      reaction,
      ...actionParams,
      ...reactionParams,
      name,
      accessToken: jwt?.split(`"`)[1],
    };
    try {
      const res = await createArea(area);
      setSucess(!res.error);
      setDialog(true);
      setName('');
      setAction({
        id: 0,
        name: '',
        serviceId: 0,
        params: [
          {
            placeholder: '',
            name: '',
            type: '',
          },
        ],
      });
      setReaction({
        id: 0,
        name: '',
        serviceId: 0,
        params: [
          {
            placeholder: '',
            name: '',
            type: '',
          },
        ],
      });
      setForceRefresh(true);
    } catch (e) {
      console.log('error', e);
    } finally {
      setForceRefresh(true);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={[
          {
            backgroundColor: isDarkMode
              ? Colors.backgroundD
              : Colors.backgroundW,
            flexGrow: 1,
          },
        ]}>
        <TitleApp title="Create your AREAs !" path="" backbutton={false} />
      </View>
      <ScrollView
        style={[
          {
            backgroundColor: isDarkMode
              ? Colors.backgroundD
              : Colors.backgroundW,
          },
          Styles.container,
        ]}>
        <SeparatorColor width={360} marginTop={0} marginLeft={0} />
        <Text
          style={[
            {
              color: isDarkMode ? Colors.textD : Colors.textW,
            },
            Styles.text,
          ]}>
          Don{"'"}t forget to
          <Text
            style={{
              color: isDarkMode ? Colors.majorD : Colors.majorW,
              fontWeight: '500',
            }}
            onPress={() => {
              navigation.navigate('UserServices');
            }}>
            {' '}
            subscribe
          </Text>
          {` to other services\nto create more AREAs !`}
        </Text>
        <SeparatorColor width={360} marginTop={0} marginLeft={0} />
        <View style={{alignItems: 'center', display: 'flex'}}>
          <TextInput
            style={Styles.containerInput}
            label={'Name your new AREA'}
            onChangeText={value => {
              setName(value);
            }}
            activeUnderlineColor={isDarkMode ? Colors.majorD : Colors.majorW}
          />
        </View>
        <View style={{zIndex: 12}}>
          <Provider>
            <View style={Styles.containerButton}>
              <Menu
                style={[Styles.containerMenu, {top: 81}]}
                visible={visibleAction}
                onDismiss={() => closeMenu('action')}
                anchor={
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
                      setForceRefresh(true);
                      if (user.services === '') setErrorService(true);
                      else openMenu('action');
                    }}>
                    <Text style={Styles.textButton}>
                      {action.name === '' ? 'Action' : action.name}
                    </Text>
                  </Pressable>
                }>
                {user.services === ''
                  ? ''
                  : actionsList
                      .filter(
                        reaction =>
                          user?.services &&
                          user.services.includes(reaction.serviceId),
                      )
                      .map(action => (
                        <Menu.Item
                          key={action.id}
                          onPress={() => {
                            setAction(action);
                            closeMenu('action');
                          }}
                          title={action.name}
                        />
                      ))}
              </Menu>
            </View>
          </Provider>
        </View>
        {action.name !== '' ? (
          <View style={{alignItems: 'center', display: 'flex'}}>
            {action.params.map((param, index) => (
              <Fragment key={index}>
                <TextInput
                  style={Styles.containerInput}
                  label={param.placeholder}
                  onChangeText={value =>
                    setActionParams({
                      ...actionParams,
                      [param.name]: value,
                    })
                  }
                  activeUnderlineColor={
                    isDarkMode ? Colors.minorD : Colors.minorW
                  }
                />
              </Fragment>
            ))}
          </View>
        ) : (
          <></>
        )}
        <View style={{zIndex: 10}}>
          <Provider>
            <View style={Styles.containerButton}>
              <Menu
                style={[Styles.containerMenu, {top: 81}]}
                visible={visibleReaction}
                onDismiss={() => closeMenu('reaction')}
                anchor={
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
                      action.name === ''
                        ? setError(true)
                        : openMenu('reaction');
                    }}>
                    <Text style={Styles.textButton}>
                      {reaction.name === '' ? 'Reaction' : reaction.name}
                    </Text>
                  </Pressable>
                }>
                {user.services === ''
                  ? ''
                  : reactionsList
                      .filter(reaction =>
                        user.services.includes(reaction.serviceId),
                      )
                      .map(reaction => (
                        <Menu.Item
                          contentStyle={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          key={reaction.id}
                          onPress={() => {
                            setReaction(reaction);
                            closeMenu('reaction');
                          }}
                          title={reaction.name}
                        />
                      ))}
              </Menu>
            </View>
          </Provider>
        </View>
        {reaction.name !== '' ? (
          <View style={{alignItems: 'center', display: 'flex'}}>
            {reaction.params.map((param, index) => (
              <Fragment key={index}>
                <TextInput
                  style={Styles.containerInput}
                  label={param.placeholder}
                  onChangeText={value =>
                    setReactionParams({
                      ...reactionParams,
                      [param.name]: value,
                    })
                  }
                  activeUnderlineColor={
                    isDarkMode ? Colors.minorD : Colors.minorW
                  }
                />
              </Fragment>
            ))}
          </View>
        ) : (
          <></>
        )}
        <Provider>
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
                action.name === '' || reaction.name === '' || name === ''
                  ? setErrorArea(true)
                  : submitArea();
              }}>
              <Text style={Styles.textButton}>Create AREA</Text>
            </Pressable>
          </View>
        </Provider>
      </ScrollView>
      <Provider>
        <View
          style={[
            {
              backgroundColor: isDarkMode
                ? Colors.backgroundD
                : Colors.backgroundW,
            },
          ]}>
          {error === true ? (
            <Portal>
              <Dialog
                visible={error}
                onDismiss={() => {
                  hideDialog('error');
                }}
                style={Styles.dialogError}>
                <Dialog.Content>
                  <Paragraph>Put an action first !</Paragraph>
                </Dialog.Content>
              </Dialog>
            </Portal>
          ) : (
            <></>
          )}
          {errorService === true ? (
            <Portal>
              <Dialog
                visible={errorService}
                onDismiss={() => {
                  hideDialog('service');
                }}
                style={Styles.dialogError}>
                <Dialog.Content>
                  <Paragraph>
                    Don{"'"}t forget to subscribe to services !
                  </Paragraph>
                </Dialog.Content>
              </Dialog>
            </Portal>
          ) : (
            <></>
          )}
          {errorArea === true ? (
            <Portal>
              <Dialog
                visible={errorArea}
                onDismiss={() => {
                  hideDialog('area');
                }}
                style={Styles.dialogError}>
                <Dialog.Content>
                  <Paragraph>All the parameters should be put.</Paragraph>
                </Dialog.Content>
              </Dialog>
            </Portal>
          ) : (
            <></>
          )}
          {dialog === true ? (
            <Portal>
              <Dialog
                visible={dialog}
                onDismiss={() => {
                  hideDialog('dialog');
                  setSucess(false);
                }}
                style={Styles.dialogError}>
                <Dialog.Content>
                  <Paragraph>
                    {sucess === true
                      ? 'Congratulations you create an AREA !'
                      : "Arg you didn't input your parameters correctly."}
                  </Paragraph>
                </Dialog.Content>
              </Dialog>
            </Portal>
          ) : (
            <></>
          )}
        </View>
      </Provider>
      <View style={Styles.navbar}>
        <Navbar page={'Create'} />
      </View>
    </View>
  );
};

export default Create;
