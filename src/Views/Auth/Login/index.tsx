import React, {FC, useState} from 'react';
import * as Styled from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../../Routes/types';
import {useDispatch} from 'react-redux';
import {requestSignInEmailPassword} from '../../../store/auth/actions';

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationType>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const signIn = () => {
    if (email && password) {
      const user = {email, password};
      dispatch(requestSignInEmailPassword(user));
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
