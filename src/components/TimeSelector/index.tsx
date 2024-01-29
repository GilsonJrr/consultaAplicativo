import React, {FC, useEffect, useState} from 'react';

import * as Styled from './styles';
import {Text} from 'react-native';
import database from '@react-native-firebase/database';
import moment from 'moment';
import {TAgenda} from '../../Views/User/Profile';

type MassageCardProps = {
  initialTime: string;
  finalTime: string;
  interval: number;
  selectedTime: (date: string) => void;
  day: Date;
};

const TimeSelector: FC<MassageCardProps> = ({
  initialTime,
  finalTime,
  interval,
  selectedTime,
  day,
}) => {
  const [chooseTime, setChooseTime] = useState<string>();
  const [agenda, setAgenda] = useState([]);

  const times = (startTime: string, endTime: string, intervalGap: number) => {
    const horaInicio = new Date(`2024-01-01 ${startTime}`);
    const horaFim = new Date(`2024-01-01 ${endTime}`);
    const horas = [];

    let timeNow = new Date(horaInicio);
    while (timeNow <= horaFim) {
      horas.push(
        timeNow.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      );
      timeNow.setMinutes(timeNow.getMinutes() + intervalGap);
    }

    return horas;
  };

  const handleSelectedDate = (date: string) => {
    setChooseTime(date);
    selectedTime(date);
  };

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const snapshot = await database().ref('/agenda').once('value');
        if (snapshot.val()) {
          setAgenda(snapshot.val());
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };
    fetchDataFromFirebase();
  }, []);

  const bookedDates: string[] = Object.values(agenda).reduce(
    (acc: string[], item: TAgenda[]) => {
      const dates = Object.values(item).map(subItem => ({
        day: new Date(subItem.dateUtc).getDate(),
        month: new Date(subItem.dateUtc).getMonth(),
        time: moment(subItem.dateUtc).format('HH:mm'),
      }));

      const filteredDates = dates.filter(
        booked =>
          booked.day === day.getDate() && booked.month === day.getMonth(),
      );

      return acc.concat(filteredDates.map(item => item.time));
    },
    [],
  );

  const timeArray = times(initialTime, finalTime, interval);
  const timeArrayFiltered =
    bookedDates.length > 0
      ? timeArray.filter(item => !bookedDates.includes(item))
      : timeArray;

  useEffect(() => {
    setChooseTime('');
  }, [day]);

  return (
    <Styled.Container horizontal showsHorizontalScrollIndicator={false}>
      {timeArray.map(date => {
        return (
          <Styled.DaysContainer
            onPress={() => handleSelectedDate(date)}
            active={chooseTime === date}
            available={timeArrayFiltered.includes(date)}
            disabled={!timeArrayFiltered.includes(date)}>
            <Text>{date}</Text>
          </Styled.DaysContainer>
        );
      })}
    </Styled.Container>
  );
};

export default TimeSelector;
