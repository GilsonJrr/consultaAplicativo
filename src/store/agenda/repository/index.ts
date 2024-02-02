import database from '@react-native-firebase/database';
import {AgendaTypeValues} from '../types';

export const getAgenda = async (uid: string) => {
  return database()
    .ref(`agenda/${uid}`)
    .once('value')
    .then(agenda => agenda.val())
    .catch(err => {
      throw new Error(err);
    });
};

export const setAgenda = async (uid: string, data: AgendaTypeValues) => {
  return database()
    .ref(`agenda/${uid}/${data.id}`)
    .set(data)
    .then(agenda => agenda)
    .catch(err => {
      throw new Error(err);
    });
};

export const getBookedDate = async () => {
  return database()
    .ref('bookedDate')
    .once('value')
    .then(bookedDate => bookedDate.val())
    .catch(err => {
      throw new Error(err);
    });
};

export const setBookedDate = async (data: AgendaTypeValues) => {
  return database()
    .ref(`bookedDate/${data.id}`)
    .set(data.dateUtc)
    .then(agenda => agenda)
    .catch(err => {
      throw new Error(err);
    });
};

export const setPackage = async (uid: string, data: AgendaTypeValues) => {
  return database()
    .ref(`package/${uid}/${data.id}`)
    .set(data)
    .then(agenda => agenda)
    .catch(err => {
      throw new Error(err);
    });
};

export const getPackage = async (uid: string) => {
  return database()
    .ref(`package/${uid}`)
    .once('value')
    .then(agenda => agenda.val())
    .catch(err => {
      throw new Error(err);
    });
};
