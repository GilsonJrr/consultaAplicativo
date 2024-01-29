import React, {FC, ReactNode} from 'react';

import * as Styled from './styles';

type ButtonsProps = {
  children?: ReactNode | ReactNode[];
  onPress?: () => void;
};

const Button: FC<ButtonsProps> = ({children, onPress}) => {
  return (
    <Styled.ButtonWarper onPress={onPress}>{children}</Styled.ButtonWarper>
  );
};

export default Button;
