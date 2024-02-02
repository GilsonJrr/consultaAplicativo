import auth from '@react-native-firebase/auth';

export const signUpWithEmailPasswordFirebase = async (
  email: string,
  password: string,
) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => user)
    .catch(error => {
      if (error.code === 'auth/wrong-password') {
        console.log('Senha icorreta');
      }
      if (error.code === '') {
      }
    });
};

export const signOutFirebase = () => {
  auth().signOut();
};

export const signInWithEmailPasswordFirebase = async (
  email: string,
  password: string,
) => {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => user.user)
    .catch(err => {
      throw new Error(err);
    });
};
