import styled from 'styled-components/native';

type Props = {
  active?: boolean;
};

export const Header = styled.View`
  background: #566246;
  width: 100%;
  padding: 20px 30px 20px;
  margin-bottom: -40px;
  z-index: 100;
  position: relative;
  display: flex;
  flex-direction: row;
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

export const TitlesContainer = styled.View``;

export const DisplayName = styled.Text`
  color: #fcfef2;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
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

export const HeaderButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: absolute;
  bottom: -50px;
`;

export const ExitButton = styled.Pressable<Props>`
  width: 50px;
  height: 50px;
  border-radius: 1000px;
  background: ${({active}) => (active ? '#d0d4bc' : '#566246')};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({active}) => (active ? '#566246' : '#d0d4bc')};
`;

export const Warper = styled.SafeAreaView`
  background-color: #fcfef2;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 22px 40px;
`;

export const UserName = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-family: Inter;
  font-size: 18px;
  margin-top: 10px;
  font-style: normal;
  font-weight: 400;
`;

export const InputContainer = styled.ScrollView`
  margin-top: 40px;
  width: 100%;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  padding: 15px 20px;
  font-size: 15px;
  color: #566246;
  margin: 0 0 10px 0;
  border: 1px solid #566246;
`;

export const InputWarper = styled.View<Props>`
  width: 100%;
  flex-shrink: 0;
  border-radius: ${({active}) => (active ? '10' : '0')}px;
  background: ${({active}) => (active ? '#ffffff' : 'transparent')};
  padding: 0 15px;
  margin: 0 0 10px 0;
  border: ${({active}) => (active ? '1px solid #566246' : 'transparent')};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease-in-out;
`;

export const SimpleInput = styled.TextInput`
  font-size: 20px;
  width: 100%;
  color: #566246;
`;

export const Label = styled.Text`
  color: #566246;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin: 10px 0 10px 5px;
`;

export const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
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

export const GoBackButton = styled.Pressable`
  position: absolute;
  left: 30px;
`;

export const FirstLoginMessage = styled.Text`
  text-align: center;
  margin-bottom: 20px;
`;
