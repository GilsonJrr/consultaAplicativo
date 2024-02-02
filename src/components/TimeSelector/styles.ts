import styled from 'styled-components/native';

type Props = {
  active?: boolean;
  available?: boolean;
};

export const Container = styled.ScrollView``;

export const DaysContainer = styled.TouchableOpacity<Props>`
  width: 78px;
  padding: 12px;
  border-radius: 13px;
  background: ${({active}) => (active ? '#D0D4BC' : '#f8fce1')};
  margin: 0 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({available}) => (available ? '1' : '0.4')};
`;

export const DaysText = styled.Text`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
`;
