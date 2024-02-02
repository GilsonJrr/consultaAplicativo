import React, {FC, useEffect, useMemo, useState} from 'react';
import {FlatList, ListRenderItem, Text} from 'react-native';

import moment from 'moment';

import * as Styled from './styles';
import {timeArrayGenerator} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {requestUserBookedDate} from '../../store/agenda/actions';
import {RootState} from '../../store/root-reducer';
import LoadingSpinner from '../LoadingSpinner';

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
  const dispatch = useDispatch();
  const {bookedDate, isLoading} = useSelector(
    (state: RootState) => state.agendaReducer,
  );
  const timeNow = moment().add(1, 'hours').format('HH:00');
  const dayNow = moment().format('DD');

  const [chooseTime, setChooseTime] = useState<string>();

  const timeArray = timeArrayGenerator(initialTime, finalTime, interval);

  const bookedDates = Object.values(bookedDate || '').reduce(
    (acc: string[], item) => {
      const formateDate = moment(item).format('HH:00');
      if (
        moment(item).format('DD/MM') === moment(day).format('DD/MM') &&
        formateDate !== 'Invalid date'
      ) {
        acc.push(formateDate);
      }
      return acc;
    },
    [],
  );

  const timeArrayFiltered = useMemo(() => {
    return bookedDates.length > 0
      ? timeArray.filter(item => !bookedDates.includes(item))
      : timeArray;
  }, [bookedDates, timeArray]);

  const timeAvailable: string[] = useMemo(() => {
    if (Number(dayNow) === day.getDate()) {
      return timeArray.filter(time => time > timeNow);
    } else {
      return timeArray;
    }
  }, [day, dayNow, timeArray, timeNow]);

  const handleSelectedDate = (date: string) => {
    setChooseTime(date);
    selectedTime(date);
  };

  const renderItem: ListRenderItem<string> = ({item}) => {
    return (
      <Styled.DaysContainer
        onPress={() => handleSelectedDate(item)}
        active={chooseTime === item}
        available={timeArrayFiltered.includes(item)}
        disabled={!timeArrayFiltered.includes(item)}>
        <Text>{item}</Text>
      </Styled.DaysContainer>
    );
  };

  useEffect(() => {
    dispatch(requestUserBookedDate());
  }, [dispatch]);

  useEffect(() => {
    setChooseTime('');
    selectedTime('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={timeAvailable}
      renderItem={renderItem}
      keyExtractor={item => item}
    />
  );
};

export default TimeSelector;
