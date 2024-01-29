import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAsyncData = async (key: string, data: any[]) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log('Error Saving Data: ', error);
  }
};

export const loadAsyncData = async (
  storageKey: string,
  setDataCallback: (item: any) => void,
) => {
  try {
    const storedData = await AsyncStorage.getItem(storageKey);

    if (storedData !== null) {
      const parsedData = JSON.parse(storedData);
      setDataCallback(parsedData);
      console.log('Data loaded successfully!');
    }
  } catch (error) {
    console.error(`Error loading data from ${storageKey}:`, error);
  }
};
