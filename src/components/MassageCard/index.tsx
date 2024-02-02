import {ServiceData} from '../../store/services/types';

import React, {FC, useEffect, useState} from 'react';

import * as Styled from './styles';

type MassageCardProps = {
  data: ServiceData;
  onReserve: () => void;
};

const MassageCard: FC<MassageCardProps> = ({data, onReserve}) => {
  const [serviceData, setServiceData] = useState(data);

  useEffect(() => {
    setServiceData(data);
  }, [data]);

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
      </Styled.ButtonContainer>
    </Styled.MassageContainer>
  );
};

export default MassageCard;
