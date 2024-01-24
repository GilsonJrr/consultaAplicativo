import React, {FC} from 'react';

import * as Styled from './styles';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ConfirmationScreenNavigationProp,
  ConfirmationScreenRouteProp,
  NavigationType,
} from '../../../Routes/types';
import moment from 'moment';

export type TInfoConfirmation = {
  service: string;
  duration: string;
  value: string;
  day: string;
  time: string;
  place: string;
  attendee: string;
  phone: string;
};

type ConfirmationProps = {
  route: ConfirmationScreenRouteProp;
  navigation: ConfirmationScreenNavigationProp;
};

const Confirmation: FC<ConfirmationProps> = ({route}) => {
  const navigation = useNavigation<NavigationType>();
  const {data} = route?.params;
  const information = [
    {label: 'Serviço:', info: data.service},
    {label: 'Duração:', info: data.duration},
    {label: 'Valor:', info: data.value},
    {
      label: 'Dia:',
      info: moment(data.day).locale('pt-br').format('DD [de] MMMM'),
    },
    {label: 'Horário:', info: data.time},
    {label: 'Local:', info: data.place},
    {label: 'Atendente:', info: data.attendee},
    {label: 'Telefone:', info: data.phone},
  ];
  return (
    <Styled.Container>
      <StatusBar backgroundColor="#566246" />
      <Styled.AlertTitle>Confirmação!!</Styled.AlertTitle>
      <Styled.AlertText>Por favor confirme se esta todo OK!!</Styled.AlertText>
      <Styled.Card>
        {information.slice(0, 5).map(info => {
          return (
            <Styled.CardTextContainer>
              <Styled.CardText type="main">{info.label}</Styled.CardText>
              <Styled.CardText numberOfLines={1} ellipsizeMode="tail">
                {info.info}
              </Styled.CardText>
            </Styled.CardTextContainer>
          );
        })}
      </Styled.Card>
      <Styled.Card>
        {information.slice(5, information.length).map(info => {
          return (
            <Styled.CardTextContainer>
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
        <Styled.Button onPress={() => navigation.navigate('Agenda')}>
          <Styled.ButtonText type="main">CONFIRMAR</Styled.ButtonText>
        </Styled.Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default Confirmation;
