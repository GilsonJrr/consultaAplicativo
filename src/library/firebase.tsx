import {AppRegistry} from 'react-native';
import App from '../../App';
import {name as appName} from '../../app.json';
import {firebase} from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
AppRegistry.registerComponent(appName, () => App);
