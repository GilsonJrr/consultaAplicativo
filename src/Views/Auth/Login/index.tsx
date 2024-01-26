import React, {FC, useState} from 'react';
import * as Styled from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../../Routes/types';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Login: FC = () => {
  const navigation = useNavigation<NavigationType>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          getUserByEmail(email), console.log('USER: ', userCredential);
        })
        .catch(error => {
          console.log(error.code);
          if (error.code === 'auth/wrong-password') {
            console.log('Senha icorreta');
          }
          if (error.code === '') {
          }
        });
    }
  };

  const getUserByEmail = async (_email: string) => {
    try {
      const userDoc = await firestore().collection('users').doc(_email).get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('Dados do usuário:', userData);
        try {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {}
      } else {
        console.log('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao obter usuário por ID:', error);
    }
  };

  return (
    <Styled.Container>
      <Styled.Logo />
      <Styled.Title>Login</Styled.Title>
      <Styled.Text>Vamos la!</Styled.Text>
      <Styled.ContentScroll>
        <Styled.Text>e-mail</Styled.Text>
        <Styled.Input value={email} onChangeText={setEmail} />
        <Styled.Text>senha</Styled.Text>
        <Styled.Input value={password} onChangeText={setPassword} />
        <Styled.AlreadyRegisteredContainer>
          <Styled.AlreadyRegistered>
            Ainda nao tem uma conta ?
          </Styled.AlreadyRegistered>
          <Styled.AlreadyRegisteredButton
            onPress={() => navigation.navigate('Registration')}>
            <Styled.AlreadyRegistered>
              {'  '}
              registre-se
            </Styled.AlreadyRegistered>
          </Styled.AlreadyRegisteredButton>
        </Styled.AlreadyRegisteredContainer>
      </Styled.ContentScroll>
      <Styled.Button onPress={signIn}>
        <Styled.ButtonText>entrar</Styled.ButtonText>
      </Styled.Button>
    </Styled.Container>
  );
};

export default Login;
