import React, {FC, useEffect, useState} from 'react';

import * as Styled from './styles';
import {
  CheckoutScreenNavigationProp,
  CheckoutScreenRouteProp,
} from '../../../Routes/types';
import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uidGenerator, updateDateTime} from '../../../utils';
import {StatusBar} from 'react-native';
import DateSelector from '../../../components/DateSelector';
import TimeSelector from '../../../components/TimeSelector';

type ModalProps = {
  // data?: TServices;
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
  //   onReserve: () => void;
};

export type BookingType = {
  id: string;
  name: string;
  date: Date;
  attendee: string;
};

const Checkout: FC<ModalProps> = ({route}) => {
  const today = new Date();
  const finalDate = new Date();
  finalDate.setDate(today.getDate() + 40);
  const navigation = useNavigation();
  const {data} = route?.params;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('08:00');
  const [userData, setUserData] = useState([]);
  // const [booked, setBooked] = useState('');
  // const {img = '', subtitle = '', title, duration, price} = data;

  useEffect(() => {
    // Carregar dados salvos ao montar o componente
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('booked');
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        console.log('Data loaded successfully!');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleBook = async () => {
    const dataTobeSaved: BookingType[] = [
      ...userData,
      {
        id: uidGenerator(10),
        name: data.title,
        date: new Date(updateDateTime(date, time)),
        attendee: 'Joana Lopes',
      },
    ];

    try {
      await AsyncStorage.setItem(
        'booked',
        JSON.stringify(dataTobeSaved),
        // '',
      );
    } catch (error) {}
    navigation.goBack();
  };

  console.log(
    'userData aqui',
    new Date(updateDateTime(date, time)).toISOString(),
  );

  const minDate = new Date();
  minDate.setHours(8, 0, 0); // Set minimum time to 8:00 AM

  const maxDate = new Date();
  maxDate.setHours(18, 0, 0); // Set maximum time to 6:00 PM

  return (
    <Styled.Container>
      <StatusBar animated={true} backgroundColor="#FCFEF2" />
      <Styled.GoBackButton onPress={() => navigation.goBack()}>
        {/* <Icon name="arrow-left" size={30} color="#900" /> */}
        <Styled.ButtonText>{'<'}</Styled.ButtonText>
      </Styled.GoBackButton>
      <Styled.CheckoutContent>
        <Styled.MassageImg
          source={{
            uri: data?.img,
          }}
        />
        <Styled.Title>{data?.title}</Styled.Title>
        <Styled.ServiceResume>
          <Styled.ServiceResumeCard>
            <Styled.ServiceResumeText>
              {data?.duration}h
            </Styled.ServiceResumeText>
            <Styled.ServiceResumeSubText>Duração</Styled.ServiceResumeSubText>
          </Styled.ServiceResumeCard>
          <Styled.ServiceResumeCard>
            <Styled.ServiceResumeText>{data?.price}</Styled.ServiceResumeText>
            <Styled.ServiceResumeSubText>Valor</Styled.ServiceResumeSubText>
          </Styled.ServiceResumeCard>
        </Styled.ServiceResume>
        <Styled.Text>Sobre</Styled.Text>
        <Styled.Description>{data?.subtitle}</Styled.Description>
        <Styled.Text>Dia</Styled.Text>
        <DateSelector
          initialDate={today}
          FinalDate={finalDate}
          selectedDate={item => setDate(item)}
        />
        <Styled.Text>Horario</Styled.Text>
        <TimeSelector
          initialTime={'08:00'}
          finalTime={'18:00'}
          interval={60}
          selectedTime={item => setTime(item)}
        />
      </Styled.CheckoutContent>

      <Styled.ButtonContainer>
        <Styled.Button onPress={handleBook}>
          <Styled.ButtonText>MARCAR</Styled.ButtonText>
        </Styled.Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default Checkout;
