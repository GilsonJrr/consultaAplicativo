import React, {FC, Fragment, useCallback, useState} from 'react';

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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/root-reducer';
import {AgendaTypeValues} from '../../../store/agenda/types';
import {setUserAgenda, setUserPackage} from '../../../store/agenda/actions';
import {requestUser} from '../../../store/user/actions';
import LoadingSpinner from '../../../components/LoadingSpinner';

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
  const dispatch = useDispatch();
  const {uid, isLoading} = useSelector((state: RootState) => state.authReducer);
  const {user, isLoading: userLoading} = useSelector(
    (state: RootState) => state.userReducer,
  );

  const navigation = useNavigation<NavigationType>();
  const {data} = route?.params;
  const [showCard, setShowCard] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(requestUser({uid: uid || ''}));
    }, [dispatch, uid]),
  );

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

  const newItem: AgendaTypeValues = {
    value: data.package
      ? String(Number(data.value) * data.quantity)
      : data.value,
    name: user?.name || '',
    service: data.service,
    type: data.package ? 'pacote' : 'simples',
    packageQuantity: data.quantity,
    phone: data.phone,
    place: data.place,
    attendee: data.attendee,
    pendent: true,
    dateUtc: dataFormatted,
    id: uidGenerator(10),
    uid: uid || '',
  };

  const handleConfirm = () => {
    if (user && uid) {
      if (data.package) {
        dispatch(setUserPackage(newItem));
        setShowCard(true);
      } else {
        dispatch(setUserAgenda(newItem));
        setShowCard(true);
      }
    }
  };

  if (isLoading || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Fragment>
      <Styled.Container>
        <StatusBar animated={true} backgroundColor="#566246" />
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
