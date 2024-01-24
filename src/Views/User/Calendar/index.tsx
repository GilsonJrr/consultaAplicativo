import React, {Fragment, useCallback, useState} from 'react';
import {FlatList, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';
import * as Styled from './styles';
import {BookingType} from '../Checkout';
import {useFocusEffect} from '@react-navigation/native';

const Calendar = () => {
  const [userData, setUserData] = useState<BookingType[]>();
  const [tab, setTab] = useState('next');

  const today = new Date();

  const nextAppointments = userData?.filter(data => {
    return new Date(data.date) > today;
  });

  const historyAppointments = userData?.filter(data => {
    return new Date(data.date) < today;
  });

  const NextAppointment = nextAppointments?.[0];

  useFocusEffect(
    useCallback(() => {
      loadStoredData();
    }, []),
  );

  const loadStoredData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('booked');
      const parsedData: BookingType[] = JSON.parse(storedData || '');
      setUserData(
        parsedData.sort(
          (a, b) => Number(new Date(a.date)) - Number(new Date(b.date)),
        ),
      );
    } catch (error) {}
  };

  return (
    <Fragment>
      <Styled.Header>
        <Styled.Text>Nosso Proximo encontro!</Styled.Text>
        <Styled.Container>
          <Styled.DateTag>
            <Text>
              {moment(NextAppointment?.date).locale('pt-br').format('DD')}
            </Text>
            <Text>
              {moment(NextAppointment?.date).locale('pt-br').format('MMM')}
            </Text>
          </Styled.DateTag>
          <Styled.BookContainer>
            <Styled.Title>{NextAppointment?.name}</Styled.Title>
            <Styled.Title>
              {moment(NextAppointment?.date).locale('pt-br').format('llll')}
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
              : []
          }
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const date = item.date;
            return (
              <Styled.Container>
                <Styled.DateTag>
                  <Text>{moment(date).locale('pt-br').format('DD')}</Text>
                  <Text>{moment(date).locale('pt-br').format('MMM')}</Text>
                </Styled.DateTag>
                <Styled.BookContainer>
                  <Text>{item.name}</Text>
                  <Text>{moment(date).locale('pt-br').format('llll')}</Text>
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
