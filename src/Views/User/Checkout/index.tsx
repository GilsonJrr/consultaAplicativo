import React, {FC, Fragment, useEffect, useState} from 'react';

import * as Styled from './styles';
import {
  CheckoutScreenNavigationProp,
  CheckoutScreenRouteProp,
  NavigationType,
} from '../../../Routes/types';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uidGenerator, updateDateTime} from '../../../utils';
import {StatusBar} from 'react-native';
import DateSelector from '../../../components/DateSelector';
import TimeSelector from '../../../components/TimeSelector';
import AlertCard from '../../../components/AlertCard';

type ModalProps = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
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
  const navigation = useNavigation<NavigationType>();
  const {data} = route?.params;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('08:00');
  const [userData, setUserData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
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
    // const dataTobeSaved: BookingType[] = [
    //   ...userData,
    //   {
    //     id: uidGenerator(10),
    //     name: data.title,
    //     date: new Date(updateDateTime(date, time)),
    //     attendee: 'Joana Lopes',
    //   },
    // ];

    // try {
    //   await AsyncStorage.setItem(
    //     'booked',
    //     JSON.stringify(dataTobeSaved),
    //     // '',
    //   );
    // } catch (error) {}
    // navigation.goBack();
    setShowAlert(true);
    navigation.navigate('Confirmation', {
      data: {
        service: data.title,
        duration: data.duration,
        value: data.price,
        day: date,
        time: time,
        place: 'consultorio',
        attendee: data.attendee,
        phone: '84 99994-0101',
      },
    });
  };

  return (
    <Fragment>
      <Styled.Container>
        <StatusBar backgroundColor="#FCFEF2" />
        <Styled.GoBackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color="#566246" />
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
      {/* {showAlert && <AlertCard title="Marcado com sucesso" />} */}
    </Fragment>
  );
};

export default Checkout;
