import React, {FC, useState} from 'react';

import * as Styled from './styles';
import {Text} from 'react-native';
import moment from 'moment';

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

  const dates = (initDate: Date, FinDate: Date) => {
    let inicio = new Date(initDate);
    let fim = new Date(FinDate);

    if (inicio > fim) {
      console.error('Data de início deve ser anterior à data de fim');
      return [];
    }

    let arrayDeDatas = [];

    while (inicio <= fim) {
      arrayDeDatas.push(new Date(inicio));
      inicio.setDate(inicio.getDate() + 1);
    }

    return arrayDeDatas;
  };

  const handleSelectedDate = (date: Date) => {
    setChooseDate(date);
    selectedDate(date);
  };

  return (
    <Styled.Container horizontal showsHorizontalScrollIndicator={false}>
      {dates(initialDate, FinalDate).map(date => {
        return (
          <Styled.DaysContainer
            onPress={() => handleSelectedDate(date)}
            active={chooseDate.getDate() === date.getDate()}>
            <Text>{moment(date).locale('pt-br').format('DD')}</Text>
            <Text>{moment(date).locale('pt-br').format('MMM')}</Text>
          </Styled.DaysContainer>
        );
      })}
    </Styled.Container>
  );
};

export default DateSelector;
