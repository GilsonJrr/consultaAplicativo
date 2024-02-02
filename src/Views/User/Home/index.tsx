import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {FlatList, ListRenderItem, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {NavigationType} from '../../../Routes/types';
import useKeyboardVisibility from '../../../hooks/useKeyboardVisibility';

import MassageCard from '../../../components/MassageCard';
import Tabs from '../../../components/Tabs';
// import Toast from '../../../components/Toast';
import * as Styled from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/root-reducer';
import {requestUserAgenda} from '../../../store/agenda/actions';
import {requestUser} from '../../../store/user/actions';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Input from '../../../components/Input';
import {requestServices} from '../../../store/services/actions';
import {ServiceData} from '../../../store/services/types';
import Toast from 'react-native-toast-message';
import moment from 'moment';

const TABS = [
  {label: 'Massoterapia', value: 'Massoterapia'},
  {label: 'Estetica', value: 'Estetica'},
];

const Home = () => {
  const dispatch = useDispatch();
  const {uid, isLoading} = useSelector((state: RootState) => state.authReducer);
  const {agenda, isLoading: agendaLoading} = useSelector(
    (state: RootState) => state.agendaReducer,
  );
  const {user, isLoading: userLoading} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const {
    massotherapyServices,
    aestheticsServices,
    isLoading: servicesLoading,
  } = useSelector((state: RootState) => state.servicesReducer);

  const navigation = useNavigation<NavigationType>();
  const isKeyboardVisible = useKeyboardVisibility();

  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('Massoterapia');

  const filteredMassages = Object.values(massotherapyServices || []).filter(a =>
    a.title.toUpperCase().includes(search.toUpperCase()),
  );

  const filteredAesthetics = Object.values(aestheticsServices || []).filter(a =>
    a.title.toUpperCase().includes(search.toUpperCase()),
  );

  const anointmentToday = useMemo(() => {
    if (agenda) {
      return Object.values(agenda)?.filter(data => {
        return (
          moment(new Date(data.dateUtc)).format('DD/MM') ===
            moment(new Date()).format('DD/MM') && !data.pendent
        );
      });
    } else {
      return [];
    }
  }, [agenda]);

  const renderItem: ListRenderItem<ServiceData> = ({item}) => {
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

  const showToast = () => {
    Toast.show({
      visibilityTime: 5000,
      type: 'alertToast',
      text1: 'Aviso',
      text2: `Lembre-se Hoje você tem um encontro conosco as ${moment(
        anointmentToday[0]?.dateUtc,
      ).format('HH:mm')}`,
      swipeable: true,
    });
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(requestUser({uid: uid || ''}));
      dispatch(requestUserAgenda({uid: uid || ''}));
      dispatch(requestServices());
    }, [dispatch, uid]),
  );

  useEffect(() => {
    user?.firstLogIn && navigation.navigate('ProfileEdit');
  }, [user, navigation]);

  if (isLoading || agendaLoading || userLoading || servicesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView>
      <StatusBar animated={true} backgroundColor="#566246" />
      <Styled.WelcomeHeader>
        {!isKeyboardVisible && (
          <Fragment>
            <Styled.AlertContainer
              onPress={() => anointmentToday?.length > 0 && showToast()}>
              {anointmentToday?.length > 0 && <Styled.AlertSign />}
              <Icon
                name="notifications"
                size={28}
                color={anointmentToday?.length > 0 ? '#FFFFFF' : '#566246'}
              />
            </Styled.AlertContainer>

            <Styled.UserName>Olá, {user?.name}</Styled.UserName>
            <Styled.Greetings>Escolha uma das nossos opções!</Styled.Greetings>
          </Fragment>
        )}
        <Input
          value={search}
          placeholder="Procure um tipo de massagem"
          onChangeText={setSearch}
          margin="20px 0 0 0"
          borderType="round"
        />
      </Styled.WelcomeHeader>
      <Styled.Warper>
        <Tabs tabs={TABS} selectTab={item => setTab(item)} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tab === 'Massoterapia' ? filteredMassages : filteredAesthetics}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 450, paddingTop: 20}}
          keyExtractor={data => data.uid}
        />
      </Styled.Warper>
      {/* <Toast
        timeOut={5000}
        displayToast={triggerToast}
        hideToast={() => setTriggerToast(false)}
        title={'Aviso'}
        description={`Lembre-se Hoje você tem um encontro conosco as ${anointmentToday[0]?.dateUtc}`}
      /> */}
    </SafeAreaView>
  );
};

export default Home;
