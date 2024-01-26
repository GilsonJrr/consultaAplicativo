import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

type Props = {
  active?: boolean;
  tabsSize: number;
};

export const TabSelectorContainer = styled.View`
  border-radius: 13px;
  background: #d0d4bc;
  height: 43px;
  width: 100%;
  padding: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TabSelector = styled.TouchableOpacity<Props>`
  border-radius: 10px;
  background: ${({active}) => (active ? '#f8fce1' : 'transparent')};
  width: ${({tabsSize}) => (windowWidth - 70) / tabsSize}px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
