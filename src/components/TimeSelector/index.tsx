import React, {FC, useState} from 'react';

import * as Styled from './styles';
import {Text} from 'react-native';

type MassageCardProps = {
  initialTime: string;
  finalTime: string;
  interval: number;
  selectedTime: (date: string) => void;
};

const TimeSelector: FC<MassageCardProps> = ({
  initialTime,
  finalTime,
  interval,
  selectedTime,
}) => {
  const [chooseTime, setChooseTime] = useState(initialTime);

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

  return (
    <Styled.Container horizontal showsHorizontalScrollIndicator={false}>
      {times(initialTime, finalTime, interval).map(date => {
        return (
          <Styled.DaysContainer
            onPress={() => handleSelectedDate(date)}
            active={chooseTime === date}>
            <Text>{date}</Text>
          </Styled.DaysContainer>
        );
      })}
    </Styled.Container>
  );
};

export default TimeSelector;
