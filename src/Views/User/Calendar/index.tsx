import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {FlatList, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import moment from 'moment';
import momentTimezone from 'moment-timezone';
import 'moment/locale/pt-br';

import {loadDataFromStorage} from '../../../utils';
import {TAgenda, TUseData} from '../Profile';
import * as Styled from './styles';
import database from '@react-native-firebase/database';
import Tabs from '../../../components/Tabs';

const Calendar = () => {
  const [tab, setTab] = useState('next');
  const [waitingTab, setWaitingTab] = useState('confirmed');
  const [userData, setUserData] = useState<TUseData>();
  const [agenda, setAgenda] = useState<TAgenda[]>();
  const [packageAppointments, setPackageAppointments] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadDataFromStorage('user', setUserData);
    }, []),
  );

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const snapshot = await database()
          .ref(`/agenda/${userData?.uid}`)
          .once('value');
        const snapshot2 = await database()
          .ref(`/package/${userData?.uid}`)
          .once('value');
        if (snapshot.val()) {
          console.log(snapshot.val());
          setAgenda(snapshot.val());
        }
        if (snapshot2.val()) {
          setPackageAppointments(snapshot2.val());
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };
    fetchDataFromFirebase();
  }, [userData?.uid]);

  const today = momentTimezone(new Date()).tz('America/Sao_Paulo').toDate();

  const nextAppointments = useMemo(() => {
    if (agenda) {
      return Object.values(agenda).filter(data => {
        return new Date(data.dateUtc) > today;
      });
    }
  }, [agenda, today]);

  const confirmed = nextAppointments?.filter(a => {
    return a.pendent === false;
  });

  const waiting = nextAppointments?.filter(a => {
    return a.pendent === true;
  });

  console.log('waiting', packageAppointments);

  const historyAppointments = useMemo(() => {
    if (agenda) {
      return Object.values(agenda).filter(data => {
        return new Date(data.dateUtc) < today;
      });
    }
  }, [agenda, today]);

  const NextAppointment = confirmed?.[0];
  const date = moment(NextAppointment?.dateUtc).locale('pt-br');

  return (
    <Styled.ContainerPage>
      <Styled.Header>
        <Styled.Text>
          {NextAppointment ? 'Nosso Proximo encontro!' : 'Sua Agenda'}
        </Styled.Text>
        {NextAppointment && (
          <Styled.Container>
            <Styled.DateTag>
              <Text>{moment(date).locale('pt-br').format('DD')}</Text>
              <Text>{moment(date).locale('pt-br').format('MMM')}</Text>
            </Styled.DateTag>
            <Styled.BookContainer>
              <Styled.Title>{NextAppointment?.service}</Styled.Title>
              <Styled.Title>
                {moment(date).locale('pt-br').format('llll')}
              </Styled.Title>
              <Styled.Title>Com: {NextAppointment?.attendee}</Styled.Title>
            </Styled.BookContainer>
          </Styled.Container>
        )}
      </Styled.Header>

      <Styled.Wrapper>
        <Tabs
          tabs={[
            {value: 'next', label: 'Proximo'},
            {value: 'packages', label: 'Pacotes'},
            {value: 'history', label: 'Historico'},
          ]}
          selectTab={item => setTab(item)}
        />
        {tab === 'next' && (
          <Styled.Tab>
            <Styled.TabOption
              onPress={() => setWaitingTab('confirmed')}
              active={waitingTab === 'confirmed'}>
              <Styled.TabText>Confirmados</Styled.TabText>
            </Styled.TabOption>
            <Styled.TabOption
              onPress={() => setWaitingTab('waiting')}
              active={waitingTab === 'waiting'}>
              <Styled.TabText>Aguardando</Styled.TabText>
            </Styled.TabOption>
          </Styled.Tab>
        )}
        <FlatList
          data={
            tab === 'next'
              ? waitingTab === 'confirmed'
                ? confirmed
                : waiting
              : tab === 'history'
              ? historyAppointments
              : tab === 'packages'
              ? Object.values(packageAppointments)
              : []
          }
          renderItem={({item}) => {
            const date = moment(item.dateUtc).locale('pt-br');
            return (
              <Styled.Container>
                <Styled.DateTag>
                  {item.type === 'pacote' ? (
                    <Text>{item.type}</Text>
                  ) : (
                    <Fragment>
                      <Text>{moment(date).format('DD')}</Text>
                      <Text>{moment(date).format('MMM')}</Text>
                    </Fragment>
                  )}
                </Styled.DateTag>
                <Styled.BookContainer>
                  <Text>
                    {item.service}{' '}
                    {item.type === 'pacote' && `X ${item.packageQuantity}`}
                  </Text>
                  {item.type === 'simples' && (
                    <Text>{date.format('llll').toString()}</Text>
                  )}
                  <Text>Com: {item.attendee}</Text>
                </Styled.BookContainer>
              </Styled.Container>
            );
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{height: 400, flexGrow: 0, width: '100%', marginTop: 20}}
        />
      </Styled.Wrapper>
    </Styled.ContainerPage>
  );
};

export default Calendar;
