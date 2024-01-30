import React, {FC, Fragment, useState} from 'react';
import * as Styled from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../../Routes/types';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {saveAsyncData} from '../../../utils/asyncStorage';

const Registration: FC = () => {
  const navigation = useNavigation<NavigationType>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const userUID = userCredential.user.uid;
        const firstLogIn = true;
        return userCredential.user.updateProfile({}).then(() => {
          return database()
            .ref(`/users/${userUID}`)
            .set({
              adminUid: '',
              email: email,
              name: '',
              age: '',
              phone: '',
              gender: '',
              uid: userUID,
              firstLogIn: firstLogIn,
              userType: 'client',
            })
            .then(() => {
              saveAsyncData('userUid', userUID);

              if (firstLogIn) {
                navigation.navigate('ProfileEdit');
              }
            });
        });
      })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/wrong-password') {
          console.log('Senha icorreta');
        }
        if (error.code === '') {
        }
      });
  };

  return (
    <Styled.Container>
      <Styled.Logo />
      <Styled.Title>Criação de conta</Styled.Title>
      <Styled.Text>Por favor entre com suas informações</Styled.Text>
      <Styled.ContentScroll>
        <Fragment>
          <Styled.Text>e-mail</Styled.Text>
          <Styled.Input value={email} onChangeText={setEmail} />
          <Styled.Text>Senha</Styled.Text>
          <Styled.Input value={password} onChangeText={setPassword} />
          <Styled.Text>Confirmar senha</Styled.Text>
          <Styled.Input value={password} onChangeText={setPassword} />
        </Fragment>
        <Styled.AlreadyRegisteredContainer>
          <Styled.AlreadyRegistered>
            Ja possui uma conta ?
          </Styled.AlreadyRegistered>
          <Styled.AlreadyRegisteredButton
            onPress={() => navigation.navigate('Login')}>
            <Styled.AlreadyRegistered>
              {'  '}
              Ir para o login
            </Styled.AlreadyRegistered>
          </Styled.AlreadyRegisteredButton>
        </Styled.AlreadyRegisteredContainer>
      </Styled.ContentScroll>
      <Styled.Button onPress={signUp}>
        <Styled.ButtonText>Entrar</Styled.ButtonText>
      </Styled.Button>
    </Styled.Container>
  );
};

export default Registration;
