import styled from 'styled-components/native';

export const Header = styled.View`
  background: #566246;
  width: 100%;
  padding: 20px 30px 20px;
  margin-bottom: -40px;
  z-index: 100;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 0px 0px 40px 40px;
`;

export const Card = styled.TouchableOpacity`
  background: #566246;
  width: 100%;
  z-index: 100;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px auto;
  border-radius: 15px;
  padding: 10px;
`;

export const CardIconContainer = styled.View`
  border-radius: 15px;
  padding: 10px;
  background: #d0d4bc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitlesContainer = styled.View``;

export const DisplayName = styled.Text`
  color: #fcfef2;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
`;

export const DisplayEmail = styled.Text`
  color: #fcfef2;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

export const PhotoContainer = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 1000px;
  background: #d0d4bc;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #566246;
`;

export const Warper = styled.SafeAreaView`
  background-color: #fcfef2;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 22px;
`;

export const OptionsContainer = styled.ScrollView`
  margin-top: 60px;
  width: 100%;
  display: flex;
`;
