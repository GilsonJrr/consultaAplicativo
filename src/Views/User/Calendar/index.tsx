import React, {Fragment, useCallback, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {loadDataFromStorage} from '../../../utils';
import {TUseData} from '../Profile';

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';
import * as Styled from './styles';
import firestore from '@react-native-firebase/firestore';

const Calendar = () => {
  const [tab, setTab] = useState('next');
  const [userData, setUserData] = useState<TUseData>();

  useFocusEffect(
    useCallback(() => {
      loadDataFromStorage('user', setUserData);
      getUserByEmail(userData?.email || '');
    }, [userData?.email]),
  );

  const getUserByEmail = async (_email: string) => {
    try {
      const userDoc = await firestore().collection('users').doc(_email).get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('Dados do usuário:', userData);
        try {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {}
      } else {
        console.log('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao obter usuário por ID:', error);
    }
  };

  const today = new Date();

  const nextAppointments = userData?.agenda?.filter(data => {
    return moment(data.day, 'DD [de] MMMM YYYY', 'pt').toDate() > today;
  });

  const historyAppointments = userData?.agenda?.filter(data => {
    return moment(data.day, 'DD [de] MMMM YYYY', 'pt').toDate() < today;
  });

  const PackagesAppointments = userData?.agenda?.filter(data => {
    return data.type === 'pacote';
  });

  const NextAppointment = nextAppointments?.[0];
  const date = moment(NextAppointment?.day, 'DD [de] MMMM', 'pt');
  const dataWithTime = moment(
    `${date.format('YYYY-MM-DD')} ${NextAppointment?.time}`,
    'YYYY-MM-DD HH:mm',
  );

  return (
    <Fragment>
      <Styled.Header>
        <Styled.Text>Nosso Proximo encontro!</Styled.Text>
        <Styled.Container>
          <Styled.DateTag>
            <Text>{moment(dataWithTime).locale('pt-br').format('DD')}</Text>
            <Text>{moment(dataWithTime).locale('pt-br').format('MMM')}</Text>
          </Styled.DateTag>
          <Styled.BookContainer>
            <Styled.Title>{NextAppointment?.service}</Styled.Title>
            <Styled.Title>
              {moment(dataWithTime).locale('pt-br').format('llll')}
            </Styled.Title>
            <Styled.Title>Com: {NextAppointment?.attendee}</Styled.Title>
          </Styled.BookContainer>
        </Styled.Container>
      </Styled.Header>
      <Styled.Wrapper>
        <Styled.Tab>
          <Styled.TabOption
            onPress={() => setTab('next')}
            active={tab === 'next'}>
            <Styled.TabText>Proximo</Styled.TabText>
          </Styled.TabOption>
          <Styled.TabOption
            onPress={() => setTab('packages')}
            active={tab === 'packages'}>
            <Styled.TabText>Pacotes</Styled.TabText>
          </Styled.TabOption>
          <Styled.TabOption
            onPress={() => setTab('history')}
            active={tab === 'history'}>
            <Styled.TabText>Historico</Styled.TabText>
          </Styled.TabOption>
        </Styled.Tab>
        <FlatList
          data={
            tab === 'next'
              ? nextAppointments
              : tab === 'history'
              ? historyAppointments
              : tab === 'packages'
              ? PackagesAppointments
              : []
          }
          renderItem={({item}) => {
            const date = moment(item.day, 'DD [de] MMMM', 'pt');
            const dataWithTime = moment(
              `${date.format('YYYY-MM-DD')} ${item.time}`,
              'YYYY-MM-DD HH:mm',
            );
            return (
              <Styled.Container>
                <Styled.DateTag>
                  {item.type === 'pacote' ? (
                    <Text>{item.type}</Text>
                  ) : (
                    <Fragment>
                      <Text>
                        {moment(dataWithTime).locale('pt-br').format('DD')}
                      </Text>
                      <Text>
                        {moment(dataWithTime).locale('pt-br').format('MMM')}
                      </Text>
                    </Fragment>
                  )}
                </Styled.DateTag>
                <Styled.BookContainer>
                  <Text>
                    {item.service}{' '}
                    {item.type === 'pacote' && `X ${item.packageQuantity}`}
                  </Text>
                  {item.type === 'simples' && (
                    <Text>
                      {moment(dataWithTime).locale('pt-br').format('llll')}
                    </Text>
                  )}
                  <Text>Com: {item.attendee}</Text>
                </Styled.BookContainer>
              </Styled.Container>
            );
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{height: 450, flexGrow: 0}}
        />
      </Styled.Wrapper>
    </Fragment>
  );
};

export default Calendar;
