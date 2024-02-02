import styled from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';

type Props = {
  borderType?: 'square' | 'round';
  margin?: string;
  size?: 'small' | 'medium' | 'large';
};

export const InputWarper = styled.View<Props>`
  width: 100%;
  flex-shrink: 0;
  border-radius: ${({borderType}) => (borderType === 'round' ? '20' : '10')}px;
  background: #ffffff;
  padding: 0 15px;
  border: 1px solid #566246;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  margin: ${({margin}) => margin || '0'};
`;

export const SimpleInputMask = styled(TextInputMask)<Props>`
  font-size: ${({size}) =>
    size === 'small' ? 16 : size === 'medium' ? 20 : 24}px;
  width: 85%;
  color: #566246;
`;
