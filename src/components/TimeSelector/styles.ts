import styled from 'styled-components/native';

type Props = {
  active?: boolean;
};

export const Container = styled.ScrollView``;

export const DaysContainer = styled.Pressable<Props>`
  width: 78px;
  /* padding: 10px; */
  height: 37px;
  border-radius: 13px;
  background: ${({active}) => (active ? '#D0D4BC' : '#f8fce1')};
  margin: 0 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DaysText = styled.Text`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
`;
