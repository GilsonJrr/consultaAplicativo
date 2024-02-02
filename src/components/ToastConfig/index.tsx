import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Styled from './styles';

interface ToastConfigParams {
  text1: string | undefined;
  text2: string | undefined;
  [key: string]: string | undefined;
}

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

export default toastConfig;
