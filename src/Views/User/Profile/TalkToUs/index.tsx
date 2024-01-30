import React, {useCallback, useEffect, useState} from 'react';

import * as Styled from './styles';
import ProfilePagesLayout from '../../../../layouts/ProfilePages';
import DropDown from '../../../../components/DropDown';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {uidGenerator} from '../../../../utils';
import {TUseData} from '..';
import database from '@react-native-firebase/database';
import {NavigationType} from '../../../../Routes/types';
import Toast from '../../../../components/Toast';
import {loadAsyncData} from '../../../../utils/asyncStorage';
import {getFirebaseValue} from '../../../../utils/fireBaseRequest';

const TalkToUs = () => {
  const navigation = useNavigation<NavigationType>();

  const [subject, setSubject] = useState<string>();
  const [body, setBody] = useState<string>();
  const [userData, setUserData] = useState<TUseData>();
  const [triggerToast, setTriggerToast] = useState(false);
  const [toastText, setToastText] = useState({title: '', description: ''});
  const [userUid, setUserUid] = useState();

  useFocusEffect(
    useCallback(() => {
      getFirebaseValue(`users/${userUid}`, setUserData);
    }, [userUid]),
  );

  useEffect(() => {
    loadAsyncData('userUid', setUserUid);
  }, []);

  const sendEmail = async () => {
    const feedbackdata = {
      userID: userData?.uid,
      subject: subject,
      body: body,
      feedbackID: uidGenerator(28),
    };
    database()
      .ref(`/feedback/${userData?.uid}/${feedbackdata.feedbackID}`)
      .set(feedbackdata)
      .then(() => {
        setTriggerToast(true);
        setToastText({
          title: 'Muito Obrigado',
          description:
            'Seu feedback foi emviado e sera levado em consideracao para a nossa evolucao',
        });
        navigation.goBack();
      })
      .catch(() => {
        setTriggerToast(true);
        setToastText({
          title: 'Algo deu errado',
          description: 'Por favor tente novamente mais tarde',
        });
      });
  };

  return (
    <ProfilePagesLayout
      pageTitle={'Fale conosco'}
      icon={'forum'}
      buttonText={'Enviar'}
      onPress={sendEmail}>
      <Styled.InputContainer>
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
        <Styled.Input
          value={subject}
          onChangeText={setSubject}
          multiline
          textAlignVertical="top"
          numberOfLines={100}
          placeholder="Fale sobre sua experiencia sobre o assunto selecionado"
        />
      </Styled.InputContainer>
      <Toast
        timeOut={5000}
        displayToast={triggerToast}
        hideToast={() => setTriggerToast(false)}
        title={toastText.title}
        description={toastText.description}
      />
    </ProfilePagesLayout>
  );
};

export default TalkToUs;
