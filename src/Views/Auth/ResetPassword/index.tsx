import React, {FC, Fragment, useState} from 'react';
import * as Styled from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../../Routes/types';
import {useDispatch} from 'react-redux';
import Input from '../../../components/Input';
import useKeyboardVisibility from '../../../hooks/useKeyboardVisibility';
import {requestPasswordReset} from '../../../store/auth/actions';

const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationType>();
  const isKeyboardVisible = useKeyboardVisibility();

  const [email, setEmail] = useState<string>();

  const signIn = () => {
    if (email) {
      const user = {email};
      dispatch(requestPasswordReset(user));
      navigation.navigate('Login');
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
          <Styled.Title>Recuperar senha</Styled.Title>
          <Styled.SubTitle>
            Entre com seu email para recuperar sua senha
          </Styled.SubTitle>
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
        <Styled.AlreadyRegisteredContainer>
          <Styled.AlreadyRegisteredButton
            onPress={() => navigation.navigate('Login')}>
            <Styled.AlreadyRegistered>
              Voltar pra o login
            </Styled.AlreadyRegistered>
          </Styled.AlreadyRegisteredButton>
        </Styled.AlreadyRegisteredContainer>
      </Styled.ContentScroll>
      <Styled.Button onPress={signIn}>
        <Styled.ButtonText>Enviar</Styled.ButtonText>
      </Styled.Button>
    </Styled.Container>
  );
};

export default ResetPassword;
