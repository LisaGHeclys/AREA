import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(key + ' not set');
  }
  console.log('Done.');
};

const getItem = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log("Couldn't get " + key);
  }
  console.log('Done.');
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(key + ' not removed');
  }
  console.log('Done.');
};

export {setItem, getItem, removeItem};
