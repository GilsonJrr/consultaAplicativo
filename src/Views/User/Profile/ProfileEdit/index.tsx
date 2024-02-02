import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import * as Styled from './styles';
import ProfilePagesLayout from '../../../../layouts/ProfilePages';
import DropDown from '../../../../components/DropDown';
import {NavigationType} from '../../../../Routes/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../store/root-reducer';
import {requestUser, setUser} from '../../../../store/user/actions';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import {UseData} from '../../../../store/user/types';
import {StatusBar} from 'react-native';
import Input from '../../../../components/Input';
import InputMask from '../../../../components/InputMask';
import Toast from 'react-native-toast-message';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const {uid, email, isLoading} = useSelector(
    (state: RootState) => state.authReducer,
  );
  const {user, isLoading: userLoading} = useSelector(
    (state: RootState) => state.userReducer,
  );

  const navigation = useNavigation<NavigationType>();

  const [name, setName] = useState<string>();
  const [birthDate, setBirthDate] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [observation, setObservation] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      dispatch(requestUser({uid: uid || ''}));
    }, [dispatch, uid]),
  );

  const handleUpdateInfo = async () => {
    const updatedUserData: UseData = {
      name: name || '',
      age: birthDate || '',
      phone: phone || '',
      gender: gender || '',
      observation: observation || '',
      firstLogIn: false,
      email: email,
      uid: uid || '',
      userType: 'user',
      adminUid: '',
    };
    dispatch(setUser(updatedUserData));
    navigation.goBack();
    showToast();
  };

  const showToast = () => {
    Toast.show({
      visibilityTime: 5000,
      type: 'successToast',
      text1: 'Maravilha',
      text2: `Seus dados foram ${
        user?.firstLogIn ? 'salvos' : 'atualizados'
      } com sucesso`,
      swipeable: true,
    });
  };

  const disableButton = useMemo(() => {
    return !name || !birthDate || !phone || !gender;
  }, [birthDate, gender, name, phone]);

  useEffect(() => {
    if (user && !user.firstLogIn) {
      setName(user.name);
      setBirthDate(user.age);
      setPhone(user.phone);
      setObservation(user.observation);
    }
  }, [user]);

  if (isLoading || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ProfilePagesLayout
      pageTitle={user?.firstLogIn ? 'Completar perfil' : 'Editar perfil'}
      icon={'person'}
      buttonText={'Salvar'}
      onPress={handleUpdateInfo}
      showGoBack={!user?.firstLogIn}
      disabledButton={disableButton}>
      <StatusBar
        animated={true}
        backgroundColor="#fcfef2"
        barStyle="dark-content"
      />
      <Styled.InputContainer>
        {user?.firstLogIn && (
          <Styled.FirstLoginMessage>
            Seja bem vindo pra continuar porfavor complete seu cadastro
          </Styled.FirstLoginMessage>
        )}
        <Input
          iconName="person"
          iconSide="left"
          iconSize={20}
          iconColor="#566246"
          value={name}
          onChangeText={setName}
          placeholder={'Seu nome aqui'}
          margin="0 0 10px 0"
          size="medium"
        />

        <InputMask
          iconName="event"
          iconSide="left"
          iconSize={20}
          iconColor="#566246"
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="01/01/2000"
          margin="0 0 10px 0"
          size="medium"
          type={'datetime'}
          options={{
            format: 'MM/DD/YYYY',
          }}
        />

        <InputMask
          iconName="call"
          iconSide="left"
          iconSize={20}
          iconColor="#566246"
          value={phone}
          onChangeText={setPhone}
          placeholder="(88) 8 8888-8888"
          margin="0 0 10px 0"
          size="medium"
          type="cel-phone"
        />

        <DropDown
          icon="radio-button-unchecked"
          initialValue={user?.gender}
          selectedValue={item => setGender(item)}
          placeholder="Selecione"
          options={[
            {label: 'Masculino', value: 'Masculino'},
            {label: 'Feminino', value: 'Feminino'},
            {label: 'Outros', value: 'Outros'},
          ]}
        />

        <Styled.Label>Observação</Styled.Label>
        <Input
          iconColor="#566246"
          value={observation}
          onChangeText={setObservation}
          multiline
          textAlignVertical="top"
          numberOfLines={6}
          placeholder="EX: Possuo dores fortes nas costas"
          margin="0 0 10px 0"
          size="medium"
        />
      </Styled.InputContainer>
    </ProfilePagesLayout>
  );
};

export default ProfileEdit;
