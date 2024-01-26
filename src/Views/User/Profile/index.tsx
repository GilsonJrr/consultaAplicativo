import React, {Fragment, useCallback, useState} from 'react';
import * as Styled from './styles';
import {ageCalculator, loadDataFromStorage} from '../../../utils';
import {Pressable, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';

export type TAgenda = {
  attendee: string;
  day: string;
  duration: string;
  phone: string;
  place: string;
  service: string;
  time: string;
  type: string;
  value: string;
  packageQuantity: number;
};

export type TUseData = {
  email: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  agenda: TAgenda[];
};

const Profile = () => {
  const [userData, setUserData] = useState<TUseData>();

  useFocusEffect(
    useCallback(() => {
      loadDataFromStorage('user', setUserData);
    }, []),
  );

  const logOut = () => {
    auth().signOut();
  };

  return (
    <Fragment>
      <Styled.Header>
        <Styled.PhotoContainer />
      </Styled.Header>
      <Styled.Warper>
        <Styled.InputContainer>
          <Styled.Label>Nome</Styled.Label>
          <Styled.Input placeholder={userData?.name} />
          <Styled.Label>Idade</Styled.Label>
          <Styled.Input
            placeholder={ageCalculator(userData?.age || '').toString()}
          />
          <Styled.Label>Phone</Styled.Label>
          <Styled.Input
            placeholder={userData?.phone}
            keyboardType="phone-pad"
          />
          <Styled.Label>Genero</Styled.Label>
          <Styled.Input placeholder={userData?.gender} />
          <Styled.Label>Observação</Styled.Label>
          <Styled.Input placeholder="EX: Possuo dores fortes nas costas" />
          {/* <Pressable onPress={() => navigation.navigate('Registration')}>
            <Text>Editar</Text>
          </Pressable> */}
          <Pressable onPress={logOut}>
            <Text>Sair</Text>
          </Pressable>
        </Styled.InputContainer>
      </Styled.Warper>
    </Fragment>
  );
};

export default Profile;
