import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {NavigationType} from '../../../Routes/types';
import * as Styled from './styles';
import {loadAsyncData, saveAsyncData} from '../../../utils/asyncStorage';
import {getFirebaseValue} from '../../../utils/fireBaseRequest';

export type TAgenda = {
  value: string;
  name: string;
  service: string;
  type: string;
  packageQuantity: number;
  phone: string;
  place: string;
  attendee: string;
  pendent: boolean;
  dateUtc: string;
  id: string;
};

export type TUseData = {
  email: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  agenda: TAgenda[];
  uid: string;
  observation: string;
  firstLogIn: boolean;
};

const Profile = () => {
  const [userData, setUserData] = useState<TUseData>();
  const navigation = useNavigation<NavigationType>();
  const [userUid, setUserUid] = useState();

  const logOut = () => {
    saveAsyncData('userUid', '');
    auth().signOut();
  };

  const options = [
    {
      label: 'Editar perfil',
      icon: 'person',
      action: () => {
        navigation.navigate('ProfileEdit');
      },
    },
    // {
    //   label: 'Configurações',
    //   icon: 'settings',
    //   action: () => {
    //     navigation.navigate('Configurations');
    //   },
    // },
    {
      label: 'Fale conosco',
      icon: 'forum',
      action: () => {
        navigation.navigate('TalkToUs');
      },
    },
    {
      label: 'Sair',
      icon: 'logout',
      action: logOut,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      getFirebaseValue(`users/${userUid}`, setUserData);
    }, [userUid]),
  );

  useEffect(() => {
    loadAsyncData('userUid', setUserUid);
  }, []);

  return (
    <Fragment>
      <Styled.Header>
        <Styled.PhotoContainer>
          <Icon name="person" size={50} color="#566246" />
        </Styled.PhotoContainer>
        <Styled.TitlesContainer>
          <Styled.DisplayName>{userData?.name}</Styled.DisplayName>
          <Styled.DisplayEmail>{userData?.email}</Styled.DisplayEmail>
        </Styled.TitlesContainer>
      </Styled.Header>
      <Styled.Warper>
        <Styled.OptionsContainer>
          {options.map((option, index) => {
            return (
              <Styled.Card key={index} onPress={option.action}>
                <Styled.CardIconContainer>
                  <Icon name={option.icon} size={30} color="#566246" />
                </Styled.CardIconContainer>
                <Styled.DisplayName>{option.label}</Styled.DisplayName>
                <Icon name="chevron-right" size={30} color="#fcfef2" />
              </Styled.Card>
            );
          })}
        </Styled.OptionsContainer>
      </Styled.Warper>
    </Fragment>
  );
};

export default Profile;
