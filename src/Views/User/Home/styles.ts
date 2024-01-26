import styled from 'styled-components/native';

export const WelcomeHeader = styled.View`
  border-radius: 0px 0px 40px 40px;
  background: #566246;
  width: 100%;
  padding: 20px 30px 20px;
  margin-bottom: -40px;
  z-index: 100;
  position: relative;
`;

export const Warper = styled.SafeAreaView`
  background-color: #fcfef2;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 60px 22px;
`;

export const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 27px 0;
  align-items: flex-end;
  gap: 18px;
`;

export const PhotoContainer = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 34.5px;
  background: #d9d9d9;
`;

export const UserName = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

export const Greetings = styled.Text`
  color: #fff;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  margin-top: 10px;
`;

export const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

export const SearchInput = styled.TextInput`
  width: 100%;
  height: 39px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  padding: 0 0 0 10px;
  margin-top: 20px;
`;

export const MassagesContainer = styled.ScrollView`
  margin: 20px 0 0 0;
  width: 100%;
  padding: 0 0 100px 0;
  display: flex;
`;

export const Space = styled.View`
  height: 100px;
`;

export const AlertContainer = styled.Pressable`
  width: 39px;
  height: 39px;
  border-radius: 9px;
  background: #717e60;
  position: absolute;
  right: 26px;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AlertSign = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: #f00;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 100;
`;
