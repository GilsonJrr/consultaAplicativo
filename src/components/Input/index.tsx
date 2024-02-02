import React, {FC} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Styled from './styles';
import {TextInputProps} from 'react-native';

type Props = {
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  iconSide?: 'left' | 'right';
  borderRadius?: string;
  margin?: string;
  borderType?: 'square' | 'round';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
} & TextInputProps;

const Input: FC<Props> = ({
  iconName = '',
  iconSize = 32,
  iconColor,
  iconSide,
  borderType,
  margin,
  size = 'small',
  onClick,
  ...TextInputProps
}) => {
  return (
    <Styled.InputWarper margin={margin} borderType={borderType}>
      {iconSide === 'left' && (
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          onPress={onClick}
        />
      )}
      <Styled.SimpleInput size={size} {...TextInputProps} />
      {iconSide === 'right' && (
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          onPress={onClick}
        />
      )}
    </Styled.InputWarper>
  );
};

export default Input;
