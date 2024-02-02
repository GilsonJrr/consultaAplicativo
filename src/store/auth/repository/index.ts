import auth from '@react-native-firebase/auth';

export const signUpWithEmailPasswordFirebase = async (
  email: string,
  password: string,
) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => user)
    .catch(error => error);
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

export const passwordResetFirebase = async (email: string) => {
  return auth()
    .sendPasswordResetEmail(email)
    .then(user => user)
    .catch(err => {
      throw new Error(err);
    });
};
