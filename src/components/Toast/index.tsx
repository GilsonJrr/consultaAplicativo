import React, {FC, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Styled from './styles';

type ToastProps = {
  title: string;
  description: string;
  displayToast: boolean;
  hideToast: () => void;
  timeOut: number;
};

const Toast: FC<ToastProps> = ({
  title,
  description,
  displayToast,
  hideToast,
  timeOut,
}) => {
  useEffect(() => {
    if (displayToast) {
      setTimeout(() => {
        hideToast();
      }, timeOut);
    }
  }, [displayToast, hideToast, timeOut]);

  if (!displayToast) {
    return;
  }

  return (
    <Styled.Container>
      <Styled.CloseButton onPress={hideToast}>
        <Icon name="close" size={20} color={'#566246'} />
      </Styled.CloseButton>
      <Styled.TitleContainer>
        <Icon name="warning" size={19} color={'#566246'} />
        <Styled.Title>{title}</Styled.Title>
      </Styled.TitleContainer>
      <Styled.Text>{description}</Styled.Text>
    </Styled.Container>
  );
};

export default Toast;
