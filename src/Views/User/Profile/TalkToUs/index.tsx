import React, {useCallback, useState} from 'react';

import * as Styled from './styles';
import ProfilePagesLayout from '../../../../layouts/ProfilePages';
import DropDown from '../../../../components/DropDown';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {uidGenerator} from '../../../../utils';
import {NavigationType} from '../../../../Routes/types';
import {useDispatch, useSelector} from 'react-redux';
import {requestUser, setUserFeedback} from '../../../../store/user/actions';
import {RootState} from '../../../../store/root-reducer';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import {StatusBar} from 'react-native';
import Input from '../../../../components/Input';
import Toast from 'react-native-toast-message';

const TalkToUs = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationType>();
  const {uid, isLoading} = useSelector((state: RootState) => state.authReducer);
  const {user, isLoading: userLoading} = useSelector(
    (state: RootState) => state.userReducer,
  );

  const [subject, setSubject] = useState<string>();
  const [body, setBody] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      dispatch(requestUser({uid: uid || ''}));
    }, [dispatch, uid]),
  );

  const showToast = () => {
    Toast.show({
      visibilityTime: 5000,
      type: 'successToast',
      text1: 'Muito Obrigado',
      text2:
        'Seu FeedBack e muito importante para desemvolver nosso atendimento',
      swipeable: true,
    });
  };

  const sendEmail = async () => {
    const feedbackdata = {
      uid: user?.uid || '',
      subject: subject || '',
      body: body || '',
      feedbackID: uidGenerator(28) || '',
    };
    dispatch(setUserFeedback(feedbackdata));
    navigation.goBack();
    showToast();
  };

  if (isLoading || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ProfilePagesLayout
      pageTitle={'Fale conosco'}
      icon={'forum'}
      buttonText={'Enviar'}
      onPress={sendEmail}>
      <Styled.InputContainer>
        <StatusBar
          animated={true}
          backgroundColor="#fcfef2"
          barStyle="dark-content"
        />
        <Styled.Label>Asunto</Styled.Label>
        <DropDown
          initialValue={'Sobre o atemdimento'}
          selectedValue={item => setBody(item)}
          options={[
            {label: 'Sobre o atemdimento', value: 'Sobre o atemdimento'},
            {label: 'Sobre o aplicativo', value: 'Sobre o aplicativo'},
          ]}
        />

        <Styled.Label>Sua mensagem</Styled.Label>
        <Input
          value={subject}
          onChangeText={setSubject}
          multiline
          textAlignVertical="top"
          numberOfLines={10}
          placeholder="Fale sobre sua experiencia sobre o assunto selecionado"
        />
      </Styled.InputContainer>
    </ProfilePagesLayout>
  );
};

export default TalkToUs;
