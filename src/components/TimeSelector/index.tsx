import React, {FC, useEffect, useMemo, useState} from 'react';
import {Text} from 'react-native';

import moment from 'moment';

import * as Styled from './styles';
import {getFirebaseValue} from '../../utils/fireBaseRequest';
import {timesArrayGenerator} from '../../utils';

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
  const timeNow = moment().add(1, 'hours').format('HH:00');
  const dayNow = moment().format('DD');
  const [chooseTime, setChooseTime] = useState<string>();
  const [agenda, setAgenda] = useState([]);

  const timeArray = timesArrayGenerator(initialTime, finalTime, interval);

  const handleSelectedDate = (date: string) => {
    setChooseTime(date);
    selectedTime(date);
  };

  useEffect(() => {
    getFirebaseValue('bookedData', setAgenda);
  }, []);

  const bookedDates = Object.values(agenda).reduce((acc: string[], item) => {
    const formateDate = moment(item).format('HH:00');
    if (
      moment(item).format('DD/MM') === moment(day).format('DD/MM') &&
      formateDate !== 'Invalid date'
    ) {
      acc.push(formateDate);
    }
    return acc;
  }, []);

  const timeArrayFiltered = useMemo(() => {
    return bookedDates.length > 0
      ? timeArray.filter(item => !bookedDates.includes(item))
      : timeArray;
  }, [bookedDates, timeArray]);

  const timeAvailable = useMemo(() => {
    if (Number(dayNow) === day.getDate()) {
      return timeArray.filter(time => time > timeNow);
    } else {
      return timeArray;
    }
  }, [day, dayNow, timeArray, timeNow]);

  useEffect(() => {
    setChooseTime('');
  }, [day]);

  return (
    <Styled.Container horizontal showsHorizontalScrollIndicator={false}>
      {timeAvailable.map((date, index) => {
        return (
          <Styled.DaysContainer
            key={index}
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
