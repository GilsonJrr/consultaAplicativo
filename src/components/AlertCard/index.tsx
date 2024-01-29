import React, {FC} from 'react';

import * as Styled from './styles';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../Routes/types';
import ReactWhatsapp from 'react-whatsapp';

type AlertCardProps = {
  title?: string;
};

const AlertCard: FC<AlertCardProps> = () => {
  const navigation = useNavigation<NavigationType>();
  return (
    <Styled.Warper>
      <Styled.Container>
        <StatusBar backgroundColor="#566246" />
        <Styled.AlertTitle>Maravilha!!</Styled.AlertTitle>
        <Styled.AlertText>
          Dentro de instantes entraremos em contato, para confirmar a sua visita
        </Styled.AlertText>
        <Styled.CheckCircle>
          <Icon name="done" size={120} color="#566246" />
        </Styled.CheckCircle>
      </Styled.Container>
      <Styled.ButtonContainer>
        <Styled.Button type="main" onPress={() => navigation.navigate('Home')}>
          <Styled.ButtonText>Home</Styled.ButtonText>
        </Styled.Button>
        <Styled.Button onPress={() => navigation.navigate('Agenda')}>
          <Styled.ButtonText>Agenda</Styled.ButtonText>
        </Styled.Button>
      </Styled.ButtonContainer>
      {/* <ReactWhatsapp number="55-84-99994-0101" message="Hello World!!!" /> */}
      {/* <ReactWhatsapp number="55-84-99994-0101" message="teste" /> */}
    </Styled.Warper>
  );
};

export default AlertCard;
