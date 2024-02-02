import React, {FC, Fragment, useState} from 'react';
import * as Styled from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../../Routes/types';
import {useDispatch} from 'react-redux';
import {requestSignUpEmailPassword} from '../../../store/auth/actions';

const Registration: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationType>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    if (email && password) {
      const user = {email, password};
      dispatch(requestSignUpEmailPassword(user));
    }
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
