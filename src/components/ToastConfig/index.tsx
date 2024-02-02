import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Styled from './styles';
import Toast from 'react-native-toast-message';

type ToastConfigParams = {
  text1?: string;
  text2?: string;
  visibilityTime?: string;
  type?: string;
  [key: string]: string | undefined;
};

interface ToastConfig {
  [key: string]: (params: ToastConfigParams) => React.ReactNode;
}

const toastConfig: ToastConfig = {
  alertToast: ({text1, text2}: ToastConfigParams) => (
    <Styled.Container>
      <Styled.TitleContainer>
        <Icon name="warning" size={19} color={'#566246'} />
        <Styled.Title>{text1}</Styled.Title>
      </Styled.TitleContainer>
      <Styled.Text>{text2}</Styled.Text>
    </Styled.Container>
  ),
  successToast: ({text1, text2}: ToastConfigParams) => (
    <Styled.Container>
      <Styled.TitleContainer>
        <Icon name="info" size={19} color={'#566246'} />
        <Styled.Title>{text1}</Styled.Title>
      </Styled.TitleContainer>
      <Styled.Text>{text2}</Styled.Text>
    </Styled.Container>
  ),
};

const showToast = ({
  text1,
  text2,
  visibilityTime = '4000',
  type = 'alertToast',
}: ToastConfigParams) => {
  Toast.show({
    visibilityTime: Number(visibilityTime),
    type: type,
    text1: text1,
    text2: text2,
    swipeable: true,
  });
};

export {toastConfig, showToast};
