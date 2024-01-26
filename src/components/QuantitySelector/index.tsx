import React, {FC, useEffect, useState} from 'react';

import * as Styled from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

type MassageCardProps = {
  selectedQuantity: (item: string) => void;
};

const QuantitySelector: FC<MassageCardProps> = ({selectedQuantity}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    selectedQuantity(quantity.toString());
  }, [quantity, selectedQuantity]);

  const handleQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Styled.Container>
      <Styled.Button onPress={handleQuantity}>
        <Icon name="chevron-left" size={50} color="#566246" />
      </Styled.Button>
      <Styled.TextContainer>
        <Styled.Text>{quantity}</Styled.Text>
      </Styled.TextContainer>
      <Styled.Button onPress={() => setQuantity(quantity + 1)}>
        <Icon name="chevron-right" size={50} color="#566246" />
      </Styled.Button>
    </Styled.Container>
  );
};

export default QuantitySelector;
