import React, {useState} from 'react';

import * as Styled from './styles';
import {massotherapy, aesthetics} from '../../../data/massages';
import {FlatList, StatusBar, Text} from 'react-native';
import MassageCard from '../../../components/MassageCard';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationType} from '../../../Routes/types';

const Home = () => {
  const userName = 'Gilson Cosme';
  const navigation = useNavigation<NavigationType>();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('massage');

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
        <Styled.UserName>Olá, {userName}</Styled.UserName>
        <Styled.Greetings>Escolha uma das nossos opções!</Styled.Greetings>
        <Styled.SearchInput
          value={search}
          placeholder="Procure um tipo de massagem"
          onChangeText={setSearch}
        />
      </Styled.WelcomeHeader>
      <Styled.Warper>
        <Styled.TabSelectorContainer>
          <Styled.TabSelector
            onPress={() => setTab('massage')}
            active={tab === 'massage'}>
            <Text>Massoterapia</Text>
          </Styled.TabSelector>
          <Styled.TabSelector
            onPress={() => setTab('aesthetic')}
            active={tab === 'aesthetic'}>
            <Text>Estetica</Text>
          </Styled.TabSelector>
        </Styled.TabSelectorContainer>
        <FlatList
          data={tab === 'massage' ? filteredMassages : filteredAesthetics}
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
