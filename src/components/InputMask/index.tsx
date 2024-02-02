import React, {FC} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInputMaskProps} from 'react-native-masked-text';

import * as Styled from './styles';

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
} & TextInputMaskProps;

const InputMask: FC<Props> = ({
  iconName = '',
  iconSize = 32,
  iconColor,
  iconSide,
  borderType,
  margin,
  size = 'small',
  onClick,
  ...textInputProps
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
      <Styled.SimpleInputMask size={size} {...textInputProps} />
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

export default InputMask;
