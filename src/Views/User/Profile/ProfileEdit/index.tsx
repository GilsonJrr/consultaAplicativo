import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {TUseData} from '..';

import * as Styled from './styles';
import ProfilePagesLayout from '../../../../layouts/ProfilePages';
import DropDown from '../../../../components/DropDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
import {NavigationType} from '../../../../Routes/types';
import {loadAsyncData} from '../../../../utils/asyncStorage';
import {getFirebaseValue} from '../../../../utils/fireBaseRequest';

const ProfileEdit = () => {
  const navigation = useNavigation<NavigationType>();

  const [userData, setUserData] = useState<TUseData>();
  const [userUid, setUserUid] = useState();
  const [name, setName] = useState<string>();
  const [birthDate, setBirthDate] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [observation, setObservation] = useState<string>();

  const firstLogin = useMemo(() => {
    if (userData) {
      return userData.firstLogIn;
    }
  }, [userData]);

  useFocusEffect(
    useCallback(() => {
      getFirebaseValue(`users/${userUid}`, setUserData);
    }, [userUid]),
  );

  const handleUpdateInfo = async () => {
    const updatedUserData = {
      name: name,
      age: birthDate,
      phone: phone,
      gender: gender,
      observation: observation,
      firstLogIn: false,
      email: userData?.email,
      uid: userData?.uid,
    };
    database()
      .ref(`/users/${userData?.uid}`)
      .update(updatedUserData)
      .then(() => {
        navigation.goBack();
      });
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {}
  };

  const disableButton = useMemo(() => {
    return !name || !birthDate || !phone || !gender;
  }, [birthDate, gender, name, phone]);

  useEffect(() => {
    loadAsyncData('userUid', setUserUid);
  }, []);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setBirthDate(userData.age);
      setPhone(userData.phone);
      setObservation(userData.observation);
    }
  }, [userData]);

  if (!userData) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    userData && (
      <ProfilePagesLayout
        pageTitle={firstLogin ? 'Completar perfil' : 'Editar perfil'}
        icon={'person'}
        buttonText={'Salvar'}
        onPress={handleUpdateInfo}
        showGoBack={!firstLogin}
        disabledButton={disableButton}>
        <Styled.InputContainer>
          {firstLogin && (
            <Styled.FirstLoginMessage>
              Seja bem vindo pra continuar porfavor complete seu cadastro
            </Styled.FirstLoginMessage>
          )}
          <Styled.InputWarper active>
            <Icon name="person" size={20} color="#566246" />
            <Styled.SimpleInput
              value={name}
              onChangeText={setName}
              placeholder={'Seu nome aqui'}
            />
          </Styled.InputWarper>

          <Styled.InputWarper active>
            <Icon name="event" size={20} color="#566246" />
            <Styled.SimpleInput
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder="01/01/2000"
            />
          </Styled.InputWarper>

          <Styled.InputWarper active>
            <Icon name="call" size={20} color="#566246" />
            <Styled.SimpleInput
              value={phone}
              onChangeText={setPhone}
              placeholder="(88) 8 8888-8888"
            />
          </Styled.InputWarper>

          <DropDown
            icon="radio-button-unchecked"
            initialValue={userData.gender}
            selectedValue={item => setGender(item)}
            placeholder="Selecione"
            options={[
              {label: 'Masculino', value: 'Masculino'},
              {label: 'Feminino', value: 'Feminino'},
              {label: 'Outros', value: 'Outros'},
            ]}
          />

          <Styled.Label>Observação</Styled.Label>
          <Styled.Input
            value={observation}
            onChangeText={setObservation}
            multiline
            textAlignVertical="top"
            numberOfLines={100}
            placeholder="EX: Possuo dores fortes nas costas"
          />
        </Styled.InputContainer>
      </ProfilePagesLayout>
    )
  );
};

export default ProfileEdit;
