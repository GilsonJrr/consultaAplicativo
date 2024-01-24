import React, {FC} from 'react';

import * as Styled from './styles';
import {TServices} from '../../data/massages';

type MassageCardProps = {
  data: TServices;
  onReserve: () => void;
  category?: string;
};

const MassageCard: FC<MassageCardProps> = ({data, onReserve, category}) => {
  const {img, title} = data;

  return (
    <Styled.MassageContainer>
      <Styled.MassageImg
        source={{
          uri: img,
        }}
      />
      <Styled.MassageInfoContainer>
        <Styled.MassageTextContainer>
          <Styled.MassageTitle numberOfLines={1}>{title}</Styled.MassageTitle>
          <Styled.MassageSubtitle numberOfLines={2}>
            {category === 'massage' ? 'Joana Lopes' : 'Outra Mulher la'}
          </Styled.MassageSubtitle>
        </Styled.MassageTextContainer>
      </Styled.MassageInfoContainer>
      <Styled.BookMassageButton onPress={onReserve}>
        <Styled.SearchButtonText>Ver detalhes</Styled.SearchButtonText>
      </Styled.BookMassageButton>
    </Styled.MassageContainer>
  );
};

export default MassageCard;
