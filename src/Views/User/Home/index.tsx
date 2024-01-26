import React, {Fragment, useCallback, useState} from 'react';

import * as Styled from './styles';
import {massotherapy, aesthetics} from '../../../data/massages';
import {FlatList, StatusBar} from 'react-native';
import MassageCard from '../../../components/MassageCard';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationType} from '../../../Routes/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from '../../../components/Tabs';
import {loadDataFromStorage} from '../../../utils';
import useKeyboardVisibility from '../../../hooks/useKeyboardVisibility';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  const navigation = useNavigation<NavigationType>();
  const isKeyboardVisible = useKeyboardVisibility();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('Massoterapia');
  const [userData, setUserData] = useState([]);
  const anointmentToday = true;

  useFocusEffect(
    useCallback(() => {
      loadDataFromStorage('user', setUserData);
    }, []),
  );

  const filteredMassages = massotherapy.filter(a =>
    a.title.toUpperCase().includes(search.toUpperCase()),
  );

  const filteredAesthetics = aesthetics.filter(a =>
    a.title.toUpperCase().includes(search.toUpperCase()),
  );

  // const handleService = (index: number) => {
  //   // return index;
  //   // setSelectedService(index);
  //   navigation.navigate('Checkout');
  // };

  return (
    <SafeAreaView>
      <StatusBar animated={true} backgroundColor="#566246" />
      <Styled.WelcomeHeader>
        <Styled.AlertContainer>
          {anointmentToday && <Styled.AlertSign />}
          <Icon
            name="notifications"
            size={28}
            color={anointmentToday ? '#FFFFFF' : '#566246'}
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
          tabs={['Massoterapia', 'Estetica']}
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
    </SafeAreaView>
  );
};

export default Home;
