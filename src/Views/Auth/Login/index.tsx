import React, {FC, useState} from 'react';
import * as Styled from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../../Routes/types';
import {useDispatch} from 'react-redux';
import {requestSignInEmailPassword} from '../../../store/auth/actions';
import Input from '../../../components/Input';

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationType>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);

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
        <Input
          value={email}
          onChangeText={setEmail}
          borderType="round"
          margin="0 0 10px 0"
        />
        <Styled.Text>senha</Styled.Text>
        <Input
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          borderType="round"
          iconName={showPassword ? 'visibility' : 'visibility-off'}
          iconSide="right"
          onClick={() => setShowPassword(prev => !prev)}
        />
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
