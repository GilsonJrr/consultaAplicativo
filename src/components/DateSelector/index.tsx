import React, {FC, useState} from 'react';
import {FlatList, ListRenderItem, Text} from 'react-native';

import moment from 'moment';

import * as Styled from './styles';
import {dateArrayGenerator} from '../../utils';

type MassageCardProps = {
  initialDate: Date;
  FinalDate: Date;
  selectedDate: (date: Date) => void;
};

const DateSelector: FC<MassageCardProps> = ({
  initialDate,
  FinalDate,
  selectedDate,
}) => {
  const [chooseDate, setChooseDate] = useState(initialDate);
  const dateArray = dateArrayGenerator(initialDate, FinalDate);

  const renderItem: ListRenderItem<Date> = ({item}) => {
    return (
      <Styled.DaysContainer
        onPress={() => handleSelectedDate(item)}
        active={chooseDate.getDate() === item.getDate()}>
        <Text>{moment(item).locale('pt-br').format('DD')}</Text>
        <Text>{moment(item).locale('pt-br').format('MMM')}</Text>
      </Styled.DaysContainer>
    );
  };

  const handleSelectedDate = (date: Date) => {
    setChooseDate(date);
    selectedDate(date);
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={dateArray}
      renderItem={renderItem}
      keyExtractor={item => item.toDateString()}
    />
  );
};

export default DateSelector;
