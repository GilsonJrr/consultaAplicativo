import styled from 'styled-components/native';

type Props = {
  active?: boolean;
};

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
  padding: 22px;
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

export const TabSelectorContainer = styled.View`
  border-radius: 13px;
  background: #d0d4bc;
  height: 43px;
  width: 100%;
  margin-top: 37px;
  padding: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TabSelector = styled.TouchableOpacity<Props>`
  border-radius: 10px;
  background: ${({active}) => (active ? '#f8fce1' : 'transparent')};
  width: 50%;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
