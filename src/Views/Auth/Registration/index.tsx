import React, {FC, Fragment, useState} from 'react';
import * as Styled from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../../Routes/types';
import {useDispatch} from 'react-redux';
import {requestSignUpEmailPassword} from '../../../store/auth/actions';
import Input from '../../../components/Input';

const Registration: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationType>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signUp = () => {
    if (email && password) {
      const user = {email, password};
      password === confirmPassword &&
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
          <Styled.Text>E-mail</Styled.Text>
          <Input
            value={email}
            onChangeText={setEmail}
            borderType="round"
            margin="0 0 10px 0"
          />
          <Styled.Text>Senha</Styled.Text>
          <Input
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            borderType="round"
            iconName={showPassword ? 'visibility' : 'visibility-off'}
            iconSide="right"
            onClick={() => setShowPassword(prev => !prev)}
            margin="0 0 10px 0"
          />
          <Styled.Text>Confirmar senha</Styled.Text>
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            borderType="round"
            iconName={showConfirmPassword ? 'visibility' : 'visibility-off'}
            iconSide="right"
            onClick={() => setShowConfirmPassword(prev => !prev)}
          />
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
