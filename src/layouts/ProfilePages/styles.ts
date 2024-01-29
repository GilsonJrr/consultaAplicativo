import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity`
  background: #566246;
  width: 100%;
  z-index: 100;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 30px auto 0;
  border-radius: 15px;
  padding: 15px;
`;

export const CardIconContainer = styled.View`
  border-radius: 15px;
  padding: 10px;
  background: #d0d4bc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DisplayName = styled.Text`
  color: #fcfef2;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
`;

export const Warper = styled.SafeAreaView`
  background-color: #fcfef2;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 22px 40px;
`;
