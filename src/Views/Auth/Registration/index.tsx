import React, {FC, Fragment, useState} from 'react';
import * as Styled from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../../Routes/types';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Registration: FC = () => {
  const navigation = useNavigation<NavigationType>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [registrationStep, setRegistrationStep] = useState(1);

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('USER: ', userCredential);
        const userUID = userCredential.user.uid;
        return userCredential.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            return firestore().collection('users').doc(userUID).set({
              email: email,
              name: name,
              age: birthDate,
              phone: phone,
              gender: gender,
              uid: userUID,
              firstLogIn: true,
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
        {registrationStep === 1 ? (
          <Fragment>
            <Styled.Text>e-mail</Styled.Text>
            <Styled.Input value={email} onChangeText={setEmail} />
            <Styled.Text>senha</Styled.Text>
            <Styled.Input value={password} onChangeText={setPassword} />
            <Styled.Text>Nome</Styled.Text>
            <Styled.Input value={name} onChangeText={setName} />
            <Styled.Text>Data de Nascimento</Styled.Text>
            <Styled.Input value={birthDate} onChangeText={setBirthDate} />
            <Styled.Text>Telefone</Styled.Text>
            <Styled.Input
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Styled.Text>Sexo</Styled.Text>
            <Styled.Input value={gender} onChangeText={setGender} />
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
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
        <Styled.ButtonText>
          {registrationStep === 1 ? 'Proximo' : 'Enviar'}
        </Styled.ButtonText>
      </Styled.Button>
    </Styled.Container>
  );
};

export default Registration;
