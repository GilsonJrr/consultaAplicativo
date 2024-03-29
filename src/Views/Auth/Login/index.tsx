import React, {FC, Fragment, useState} from 'react';
import * as Styled from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../../Routes/types';
import {useDispatch} from 'react-redux';
import {requestSignInEmailPassword} from '../../../store/auth/actions';
import Input from '../../../components/Input';
import useKeyboardVisibility from '../../../hooks/useKeyboardVisibility';

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationType>();
  const isKeyboardVisible = useKeyboardVisibility();

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
      {!isKeyboardVisible && (
        <Fragment>
          <Styled.Logo
            source={require('../../../assets/main_logo.png')}
            resizeMode="contain"
          />
          <Styled.Title>Login</Styled.Title>
          <Styled.Text>Vamos la!</Styled.Text>
        </Fragment>
      )}
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
        {/* <Styled.TextSeparator>ou</Styled.TextSeparator> */}
        {/* SSO butons aqui */}
        <Styled.AlreadyRegisteredContainer>
          <Styled.AlreadyRegisteredButton
            onPress={() => navigation.navigate('Registration')}>
            <Styled.AlreadyRegistered>Criar uma conta</Styled.AlreadyRegistered>
          </Styled.AlreadyRegisteredButton>
          <Styled.AlreadyRegisteredButton
            onPress={() => navigation.navigate('ResetPassword')}>
            <Styled.AlreadyRegistered>
              Esqueceu a senha ?
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
