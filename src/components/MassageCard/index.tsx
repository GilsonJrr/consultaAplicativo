import React, {FC, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Styled from './styles';
import {TServices} from '../../data/massages';
import styled from 'styled-components';

type MassageCardProps = {
  data: TServices;
  onReserve: () => void;
};

const MassageCard: FC<MassageCardProps> = ({data, onReserve}) => {
  // const {img, title, attendee} = data;
  const [serviceData, setServiceData] = useState(data);

  useEffect(() => {
    setServiceData(data);
  }, [data]);

  const handleFavorite = (id: number) => {
    setServiceData(
      serviceData.id === id
        ? {...serviceData, favorite: !serviceData.favorite}
        : serviceData,
    );
  };

  return (
    <Styled.MassageContainer>
      <Styled.MassageImg
        source={{
          uri: serviceData.img,
        }}
      />
      <Styled.MassageInfoContainer>
        <Styled.MassageTextContainer>
          <Styled.MassageTitle numberOfLines={1}>
            {serviceData.title}
          </Styled.MassageTitle>
          <Styled.MassageSubtitle numberOfLines={2}>
            {serviceData.attendee}
          </Styled.MassageSubtitle>
        </Styled.MassageTextContainer>
      </Styled.MassageInfoContainer>
      <Styled.ButtonContainer>
        <Styled.BookMassageButton onPress={onReserve}>
          <Styled.SearchButtonText>Ver detalhes</Styled.SearchButtonText>
        </Styled.BookMassageButton>
        <Styled.BookMassageButton
          onPress={() => handleFavorite(serviceData.id)}>
          <Icon
            name="favorite"
            size={20}
            color={serviceData.favorite ? '#566246' : '#a8b09c'}
          />
        </Styled.BookMassageButton>
      </Styled.ButtonContainer>
    </Styled.MassageContainer>
  );
};

export default MassageCard;
