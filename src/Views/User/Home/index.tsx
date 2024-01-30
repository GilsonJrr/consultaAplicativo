import React, {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StatusBar,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {massotherapy, aesthetics, TServices} from '../../../data/massages';
import {NavigationType} from '../../../Routes/types';
import {TAgenda} from '../Profile';
import {TUseData} from '../Profile';
import useKeyboardVisibility from '../../../hooks/useKeyboardVisibility';

import MassageCard from '../../../components/MassageCard';
import Tabs from '../../../components/Tabs';
import Toast from '../../../components/Toast';
import * as Styled from './styles';
import {loadAsyncData} from '../../../utils/asyncStorage';
import {getFirebaseValue} from '../../../utils/fireBaseRequest';

const TABS = [
  {label: 'Massoterapia', value: 'Massoterapia'},
  {label: 'Estetica', value: 'Estetica'},
];

const Home = () => {
  const navigation = useNavigation<NavigationType>();
  const isKeyboardVisible = useKeyboardVisibility();

  const [userUid, setUserUid] = useState();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('Massoterapia');
  const [userData, setUserData] = useState<TUseData>();
  const [agenda, setAgenda] = useState<TAgenda[]>();
  const [triggerToast, setTriggerToast] = useState(false);
  const [loading, setLoading] = useState(true);

  const filteredMassages = massotherapy.filter(a =>
    a.title.toUpperCase().includes(search.toUpperCase()),
  );

  const filteredAesthetics = aesthetics.filter(a =>
    a.title.toUpperCase().includes(search.toUpperCase()),
  );

  const anointmentToday = useMemo(() => {
    if (agenda) {
      return Object.values(agenda)?.filter(data => {
        return new Date(data.dateUtc) > new Date() && !data.pendent;
      });
    } else {
      return [];
    }
  }, [agenda]);

  const renderItem: ListRenderItem<TServices> = ({item}) => {
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
  };

  useFocusEffect(
    useCallback(() => {
      getFirebaseValue(`users/${userUid}`, setUserData);
      getFirebaseValue(`agenda/${userUid}`, setAgenda);
    }, [userUid]),
  );

  useEffect(() => {
    loadAsyncData('userUid', setUserUid);
  }, []);

  useLayoutEffect(() => {
    if (userData) {
      setLoading(false);
      userData.firstLogIn && navigation.navigate('ProfileEdit');
    }
  }, [navigation, userData]);

  if (loading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles, react/jsx-no-undef
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar animated={true} backgroundColor="#566246" />
      <Styled.WelcomeHeader>
        {!isKeyboardVisible && (
          <Fragment>
            <Styled.AlertContainer
              onPress={() =>
                anointmentToday?.length > 0 && setTriggerToast(true)
              }>
              {anointmentToday?.length > 0 && <Styled.AlertSign />}
              <Icon
                name="notifications"
                size={28}
                color={anointmentToday?.length > 0 ? '#FFFFFF' : '#566246'}
              />
            </Styled.AlertContainer>

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
        <Tabs tabs={TABS} selectTab={item => setTab(item)} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tab === 'Massoterapia' ? filteredMassages : filteredAesthetics}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 450, paddingTop: 20}}
        />
      </Styled.Warper>
      <Toast
        timeOut={5000}
        displayToast={triggerToast}
        hideToast={() => setTriggerToast(false)}
        title={'Aviso'}
        description={`Lembre-se Hoje você tem um encontro conosco as ${anointmentToday[0]?.dateUtc}`}
      />
    </SafeAreaView>
  );
};

export default Home;
