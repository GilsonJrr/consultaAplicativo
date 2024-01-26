// import {initializeApp} from 'firebase/app';
// import {getFirestore} from 'firebase/firestore';
// import {getAuth} from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBDHPXN21BXQCXGPyC8j8ik59oh_KmXPqM',
//   authDomain: 'consulta-app-6ab31.firebaseapp.com',
//   projectId: 'consulta-app-6ab31',
//   storageBucket: 'consulta-app-6ab31.appspot.com',
//   messagingSenderId: '735689330659',
//   appId: '1:735689330659:web:4d4a8d8dc37e58985cdad6',
//   measurementId: 'G-9RHV9PZQ0N',
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export default app;

import {AppRegistry} from 'react-native';
import App from '../../App';
import {name as appName} from '../../app.json';
import {firebase} from '@react-native-firebase/app';

// Your Firebase config
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

AppRegistry.registerComponent(appName, () => App);
