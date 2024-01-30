import database from '@react-native-firebase/database';

export const getFirebaseValue = async (
  path: string,
  valueCallBack: (item: any) => void,
) => {
  try {
    const updatedData = await database().ref(path).once('value');
    if (updatedData.val()) {
      valueCallBack(updatedData.val());
    }
  } catch {}
};
