import React, {FC, Fragment, useCallback, useEffect, useState} from 'react';

import * as Styled from './styles';
import {StatusBar} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  ConfirmationScreenNavigationProp,
  ConfirmationScreenRouteProp,
  NavigationType,
} from '../../../Routes/types';
import moment from 'moment';
import AlertCard from '../../../components/AlertCard';
import {uidGenerator} from '../../../utils';
import {TUseData} from '../Profile';
import database from '@react-native-firebase/database';
import {getFirebaseValue} from '../../../utils/fireBaseRequest';
import {loadAsyncData} from '../../../utils/asyncStorage';

export type TInfoConfirmation = {
  service: string;
  duration: string;
  value: string;
  day: string;
  time: string;
  place: string;
  attendee: string;
  phone: string;
  package: boolean;
  quantity: number;
  utcDate: string;
};

type ConfirmationProps = {
  route: ConfirmationScreenRouteProp;
  navigation: ConfirmationScreenNavigationProp;
};

const Confirmation: FC<ConfirmationProps> = ({route}) => {
  const navigation = useNavigation<NavigationType>();
  const {data} = route?.params;
  const [showCard, setShowCard] = useState(false);
  const [userData, setUserData] = useState<TUseData>();
  const [userUid, setUserUid] = useState();

  useFocusEffect(
    useCallback(() => {
      getFirebaseValue(`users/${userUid}`, setUserData);
    }, [userUid]),
  );

  useEffect(() => {
    loadAsyncData('userUid', setUserUid);
  }, []);
  console.log(userData);

  const information = [
    {label: 'Serviço:', info: data.service},
    {label: 'Duração:', info: data.duration},
    {
      label: 'Valor:',
      info: data.package ? Number(data.value) * data.quantity : data.value,
    },
    {
      label: 'Dia:',
      info: data.package
        ? ''
        : moment(data.day).locale('pt-br').format('DD [de] MMMM'),
    },
    {label: 'Horário:', info: data.package ? '' : data.time},
    {
      label: 'Tipo:',
      info: data.package ? `pacote x ${data.quantity}` : 'simples',
    },
    {label: 'Local:', info: data.place},
    {label: 'Atendente:', info: data.attendee},
    {label: 'Telefone:', info: data.phone},
  ];

  const dataFormatted = moment(
    `${moment(data.day).toDate().getMonth() + 1}/${moment(data.day)
      .toDate()
      .getDate()} ${data.time}`,
    'MM/DD HH:mm',
  ).format();

  const newItem = {
    value: data.package ? Number(data.value) * data.quantity : data.value,
    name: userData?.name,
    service: data.service,
    type: data.package ? 'pacote' : 'simples',
    packageQuantity: data.quantity,
    phone: data.phone,
    place: data.place,
    attendee: data.attendee,
    pendent: true,
    dateUtc: dataFormatted,
    id: uidGenerator(10),
  };

  const handleConfirm = () => {
    if (userData && userData.uid) {
      if (data.package) {
        database().ref(`/package/${userData.uid}/${newItem.id}`).set(newItem);
        setShowCard(true);
      } else {
        database().ref(`/agenda/${userData.uid}/${newItem.id}`).set(newItem);
        database().ref(`/bookedData/${newItem.id}`).set(newItem.dateUtc);
        setShowCard(true);
      }
    }
  };

  return (
    <Fragment>
      <Styled.Container>
        <StatusBar backgroundColor="#566246" />
        <Styled.AlertTitle>Confirmação!!</Styled.AlertTitle>
        <Styled.AlertText>
          Por favor confirme se esta todo OK!!
        </Styled.AlertText>
        <Styled.Card>
          {information.slice(0, 6).map((info, index) => {
            if (info.info) {
              return (
                <Styled.CardTextContainer key={index}>
                  <Styled.CardText type="main">{info.label}</Styled.CardText>
                  <Styled.CardText>{info.info}</Styled.CardText>
                </Styled.CardTextContainer>
              );
            }
          })}
        </Styled.Card>
        <Styled.Card>
          {information.slice(6, information.length).map((info, index) => {
            return (
              <Styled.CardTextContainer key={index}>
                <Styled.CardText type="main">{info.label}</Styled.CardText>
                <Styled.CardText numberOfLines={1} ellipsizeMode="tail">
                  {info.info}
                </Styled.CardText>
              </Styled.CardTextContainer>
            );
          })}
        </Styled.Card>
        <Styled.ButtonContainer>
          <Styled.Button type="main" onPress={() => navigation.goBack()}>
            <Styled.ButtonText>CANCELAR</Styled.ButtonText>
          </Styled.Button>
          <Styled.Button onPress={() => handleConfirm()}>
            <Styled.ButtonText type="main">CONFIRMAR</Styled.ButtonText>
          </Styled.Button>
        </Styled.ButtonContainer>
      </Styled.Container>
      {showCard && <AlertCard />}
    </Fragment>
  );
};

export default Confirmation;
