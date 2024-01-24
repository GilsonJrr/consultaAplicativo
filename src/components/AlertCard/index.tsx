import React, {FC} from 'react';

import * as Styled from './styles';
import {ScrollView, StatusBar, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NavigationType} from '../../Routes/types';

type AlertCardProps = {
  title: string;
};

const AlertCard: FC<AlertCardProps> = ({title}) => {
  const navigation = useNavigation<NavigationType>();
  return (
    <Styled.Container>
      <Styled.Warper>
        <StatusBar backgroundColor="#566246" />
        <Styled.AlertTitle>Maravilha!!</Styled.AlertTitle>
        <Styled.AlertText>
          Dentro de instantes entraremos em contato, para confirmar a sua visita
        </Styled.AlertText>
        <Styled.CheckCircle>
          <Icon name="done" size={120} color="#566246" />
        </Styled.CheckCircle>
        <Styled.ButtonContainer>
          <Styled.Button
            type="main"
            onPress={() => navigation.navigate('Home')}>
            <Styled.ButtonText>Home</Styled.ButtonText>
          </Styled.Button>
          <Styled.Button onPress={() => navigation.navigate('Agenda')}>
            <Styled.ButtonText>Agenda</Styled.ButtonText>
          </Styled.Button>
        </Styled.ButtonContainer>
      </Styled.Warper>
    </Styled.Container>
  );
};

export default AlertCard;
