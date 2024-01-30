import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {FlatList, ListRenderItem, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import moment from 'moment';
import momentTimezone from 'moment-timezone';
import 'moment/locale/pt-br';

import * as Styled from './styles';
import {TAgenda} from '../Profile';
import {getFirebaseValue} from '../../../utils/fireBaseRequest';
import {loadAsyncData} from '../../../utils/asyncStorage';
import Tabs from '../../../components/Tabs';

const Calendar = () => {
  const [tab, setTab] = useState('next');
  const [waitingTab, setWaitingTab] = useState('confirmed');
  const [agenda, setAgenda] = useState<TAgenda[]>();
  const [packageAppointments, setPackageAppointments] = useState([]);
  const [userUid, setUserUid] = useState();

  const renderItem: ListRenderItem<TAgenda> = ({item}) => {
    const dateConverted = moment(item.dateUtc).locale('pt-br');
    return (
      <Styled.Container>
        <Styled.DateTag>
          {item.type === 'pacote' ? (
            <Text>{item.type}</Text>
          ) : (
            <Fragment>
              <Text>{moment(dateConverted).format('DD')}</Text>
              <Text>{moment(dateConverted).format('MMM')}</Text>
            </Fragment>
          )}
        </Styled.DateTag>
        <Styled.BookContainer>
          <Text>
            {item.service}{' '}
            {item.type === 'pacote' && `X ${item.packageQuantity}`}
          </Text>
          {item.type === 'simples' && (
            <Text>{dateConverted.format('llll').toString()}</Text>
          )}
          <Text>Com: {item.attendee}</Text>
        </Styled.BookContainer>
      </Styled.Container>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getFirebaseValue(`agenda/${userUid}`, setAgenda);
      getFirebaseValue(`package/${userUid}`, setPackageAppointments);
    }, [userUid]),
  );

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

  const historyAppointments = useMemo(() => {
    if (agenda) {
      return Object.values(agenda).filter(data => {
        return new Date(data.dateUtc) < today;
      });
    }
  }, [agenda, today]);

  const NextAppointment = confirmed?.[0];
  const date = moment(NextAppointment?.dateUtc).locale('pt-br');

  const selectedTab = useMemo(() => {
    return tab === 'next'
      ? waitingTab === 'confirmed'
        ? confirmed
        : waiting
      : tab === 'history'
      ? historyAppointments
      : tab === 'packages'
      ? Object.values(packageAppointments)
      : [];
  }, [
    confirmed,
    historyAppointments,
    packageAppointments,
    tab,
    waiting,
    waitingTab,
  ]);

  useEffect(() => {
    loadAsyncData('userUid', setUserUid);
  }, []);

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
          showsVerticalScrollIndicator={false}
          data={selectedTab}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 450, paddingTop: 20}}
        />
      </Styled.Wrapper>
    </Styled.ContainerPage>
  );
};

export default Calendar;
