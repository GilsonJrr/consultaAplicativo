import styled from 'styled-components/native';

type Props = {
  active?: boolean;
};

export const Header = styled.View`
  border-radius: 0px 0px 40px 40px;
  background: #566246;
  width: 100%;
  padding: 20px 30px 20px;
  margin-bottom: -40px;
  z-index: 100;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
`;

export const Warper = styled.SafeAreaView`
  background-color: #fcfef2;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 22px;
`;

export const PhotoContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 1000px;
  background: #d9d9d9;
  position: absolute;
  top: 50%;
`;

export const UserName = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-family: Inter;
  font-size: 18px;
  margin-top: 10px;
  font-style: normal;
  font-weight: 400;
`;

export const InputContainer = styled.View`
  margin-top: 50px;
  width: 100%;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 39px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  padding: 10px;
  margin: 0 0 20px 0;
  border: 1px solid #566246;
`;

export const Label = styled.Text`
  color: #566246;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin: 0 0 4px 2px;
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
