import React, {Fragment, useCallback} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {NavigationType} from '../../../Routes/types';
import * as Styled from './styles';
import {FlatList, ListRenderItem} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/root-reducer';
import {requestSignOut} from '../../../store/auth/actions';
import {requestUser} from '../../../store/user/actions';
import LoadingSpinner from '../../../components/LoadingSpinner';
// import {selectUser} from '../../../library/redux/authSlice';

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

export type TOptions = {
  label: string;
  icon: string;
  action: () => void;
};

const Profile = () => {
  const dispatch = useDispatch();
  const {uid, isLoading} = useSelector((state: RootState) => state.authReducer);
  const {user, isLoading: userLoading} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const navigation = useNavigation<NavigationType>();

  const logOut = () => {
    dispatch(requestSignOut());
  };

  const options: TOptions[] = [
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

  const renderItem: ListRenderItem<TOptions> = ({item}) => {
    return (
      <Styled.Card onPress={item.action}>
        <Styled.CardIconContainer>
          <Icon name={item.icon} size={30} color="#566246" />
        </Styled.CardIconContainer>
        <Styled.DisplayName>{item.label}</Styled.DisplayName>
        <Icon name="chevron-right" size={30} color="#fcfef2" />
      </Styled.Card>
    );
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(requestUser({uid: uid || ''}));
    }, [dispatch, uid]),
  );

  if (isLoading || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Fragment>
      <Styled.Header>
        <Styled.PhotoContainer>
          <Icon name="person" size={50} color="#566246" />
        </Styled.PhotoContainer>
        <Styled.TitlesContainer>
          <Styled.DisplayName>{user?.name}</Styled.DisplayName>
          <Styled.DisplayEmail>{user?.email}</Styled.DisplayEmail>
        </Styled.TitlesContainer>
      </Styled.Header>
      <Styled.Warper>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={options}
          renderItem={renderItem}
          contentContainerStyle={{paddingTop: 60}}
        />
      </Styled.Warper>
    </Fragment>
  );
};

export default Profile;
