import styled from 'styled-components/native';

type Props = {
  active?: boolean;
};

export const Container = styled.ScrollView`
  height: 0px;
  margin: 0 0 -40px 0;
  padding: 0;
`;

export const DaysContainer = styled.Pressable<Props>`
  width: 61px;
  height: 66px;
  border-radius: 13px;
  background: ${({active}) => (active ? '#D0D4BC' : '#f8fce1')};
  margin: 0 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
