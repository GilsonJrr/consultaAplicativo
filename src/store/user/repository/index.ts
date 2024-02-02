import database from '@react-native-firebase/database';
import {UseData, FeedbackData} from '../types';

export const getUser = async (uid: string) => {
  return database()
    .ref(`user/${uid}`)
    .once('value')
    .then(agenda => agenda.val())
    .catch(err => {
      throw new Error(err);
    });
};

export const setUser = async (uid: string, data: UseData) => {
  return database()
    .ref(`user/${uid}`)
    .set(data)
    .then(agenda => agenda)
    .catch(err => {
      throw new Error(err);
    });
};

export const setUserFeedback = async (uid: string, data: FeedbackData) => {
  return database()
    .ref(`feedback/${uid}/${data.uid}`)
    .set(data)
    .then(agenda => agenda)
    .catch(err => {
      throw new Error(err);
    });
};
