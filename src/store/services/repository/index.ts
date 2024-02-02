import database from '@react-native-firebase/database';

export const getServices = async () => {
  return database()
    .ref('services')
    .once('value')
    .then(service => service.val())
    .catch(err => {
      throw new Error(err);
    });
};
