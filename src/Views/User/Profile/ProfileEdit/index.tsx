import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {loadDataFromStorage} from '../../../../utils';
import {TUseData} from '..';

import * as Styled from './styles';
import ProfilePagesLayout from '../../../../layouts/ProfilePages';
import DropDown from '../../../../components/DropDown';

const ProfileEdit = () => {
  const [userData, setUserData] = useState<TUseData>();

  useFocusEffect(
    useCallback(() => {
      loadDataFromStorage('user', setUserData);
    }, []),
  );

  return (
    <ProfilePagesLayout
      pageTitle={'Editar perfil'}
      icon={'person'}
      buttonText={'Salvar'}>
      <Styled.InputContainer>
        <Styled.InputWarper active>
          <Icon name="person" size={20} color="#566246" />
          <Styled.SimpleInput placeholder={userData?.name} />
        </Styled.InputWarper>

        <Styled.InputWarper active>
          <Icon name="event" size={20} color="#566246" />
          <Styled.SimpleInput placeholder={userData?.age} />
        </Styled.InputWarper>

        <Styled.InputWarper active>
          <Icon name="call" size={20} color="#566246" />
          <Styled.SimpleInput placeholder={userData?.phone} />
        </Styled.InputWarper>

        <DropDown
          icon="radio-button-unchecked"
          initialValue={userData?.gender}
          options={[
            {label: 'Masculino', value: 'Masculino'},
            {label: 'Feminino', value: 'Feminino'},
            {label: 'Outros', value: 'Outros'},
          ]}
        />

        <Styled.Label>Observação</Styled.Label>
        <Styled.Input
          multiline
          textAlignVertical="top"
          numberOfLines={100}
          placeholder="EX: Possuo dores fortes nas costas"
        />
      </Styled.InputContainer>
    </ProfilePagesLayout>
  );
};

export default ProfileEdit;
