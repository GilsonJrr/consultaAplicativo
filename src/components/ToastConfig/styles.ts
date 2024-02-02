import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 12px;
  border: 3px solid #566246;
  background: #fcfef2;
  width: 90%;
  padding: 12px 22px 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: baseline;
  gap: 5px;
`;

export const CloseButton = styled.Pressable`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const Title = styled.Text`
  color: #566246;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;

export const Text = styled.Text`
  color: #566246;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
