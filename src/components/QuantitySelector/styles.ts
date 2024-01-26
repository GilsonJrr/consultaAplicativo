import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 20px;
  background: #d0d4bc;
  align-items: center;
  /* width: 50%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const Text = styled.Text`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
`;

export const TextContainer = styled.View`
  border-radius: 13px;
  background: #f8fce1;
  width: 48%;
  padding: 11px 0;
`;

export const Button = styled.Pressable``;
