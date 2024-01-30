import React, {FC, ReactNode} from 'react';

import * as Styled from './styles';

type ButtonsProps = {
  children?: ReactNode | ReactNode[];
  onPress?: () => void;
  disabled?: boolean;
};

const Button: FC<ButtonsProps> = ({children, onPress, disabled}) => {
  return (
    <Styled.ButtonWarper onPress={onPress} disabled={disabled}>
      {children}
    </Styled.ButtonWarper>
  );
};

export default Button;
