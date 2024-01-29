import React, {
  Fragment,
  useCallback,
  // useEffect,
  useMemo,
  useState,
} from 'react';
import {FlatList, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import {massotherapy, aesthetics} from '../../../data/massages';
import {NavigationType} from '../../../Routes/types';
import {TAgenda} from '../Profile';
import {TUseData} from '../Profile';
import useKeyboardVisibility from '../../../hooks/useKeyboardVisibility';

import {loadDataFromStorage} from '../../../utils';
import MassageCard from '../../../components/MassageCard';
import Tabs from '../../../components/Tabs';
import Toast from '../../../components/Toast';
import * as Styled from './styles';
// import {saveAsyncData, loadAsyncData} from '../../../utils/asyncStorage';

const Home = () => {
  const navigation = useNavigation<NavigationType>();
  const isKeyboardVisible = useKeyboardVisibility();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const agenda: TAgenda[] = [];

  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('Massoterapia');
  const [userData, setUserData] = useState<TUseData>();
  // const [services, setServices] = useState();
  const [triggerToast, setTriggerToast] = useState(false);

  const anointmentToday = useMemo(() => {
    return agenda?.filter(data => {
      return (
        moment(data.day, 'DD [de] MMMM YYYY', 'pt').toDate().getDate() ===
        new Date().getDate()
      );
    });
  }, [agenda]);

  useFocusEffect(
    useCallback(() => {
      loadDataFromStorage('user', setUserData);
      // loadAsyncData('services', setServices);
    }, []),
  );

  // useEffect(() => {
  //   saveAsyncData('services', massotherapy);
  // });

  const filteredMassages = massotherapy.filter(a =>
    a.title.toUpperCase().includes(search.toUpperCase()),
  );

  const filteredAesthetics = aesthetics.filter(a =>
    a.title.toUpperCase().includes(search.toUpperCase()),
  );

  return (
    <SafeAreaView>
      <StatusBar animated={true} backgroundColor="#566246" />
      <Styled.WelcomeHeader>
        <Styled.AlertContainer
          onPress={() => anointmentToday.length > 0 && setTriggerToast(true)}>
          {anointmentToday.length > 0 && <Styled.AlertSign />}
          <Icon
            name="notifications"
            size={28}
            color={anointmentToday.length > 0 ? '#FFFFFF' : '#566246'}
          />
        </Styled.AlertContainer>
        {!isKeyboardVisible && (
          <Fragment>
            <Styled.UserName>Olá, {userData?.name}</Styled.UserName>
            <Styled.Greetings>Escolha uma das nossos opções!</Styled.Greetings>
          </Fragment>
        )}
        <Styled.SearchInput
          value={search}
          placeholder="Procure um tipo de massagem"
          onChangeText={setSearch}
        />
      </Styled.WelcomeHeader>
      <Styled.Warper>
        <Tabs
          tabs={[
            {label: 'Massoterapia', value: 'Massoterapia'},
            {label: 'Estetica', value: 'Estetica'},
          ]}
          selectTab={item => setTab(item)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tab === 'Massoterapia' ? filteredMassages : filteredAesthetics}
          renderItem={({item}) => {
            return (
              <MassageCard
                data={item}
                onReserve={() => {
                  navigation.navigate('Checkout', {
                    data: item,
                  });
                }}
              />
            );
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginTop: 20}}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{paddingBottom: 450}}
        />
      </Styled.Warper>
      <Toast
        timeOut={5000}
        displayToast={triggerToast}
        hideToast={() => setTriggerToast(false)}
        title={'Aviso'}
        description={`Lembre-se Hoje você tem um encontro conosco as ${anointmentToday[0]?.time}`}
      />
    </SafeAreaView>
  );
};

export default Home;
