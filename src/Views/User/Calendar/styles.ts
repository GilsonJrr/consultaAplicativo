import styled from 'styled-components/native';

type Props = {
  active?: boolean;
};

export const Wrapper = styled.SafeAreaView`
  padding: 0 20px;
  margin-top: 40px;
`;

export const Header = styled.View`
  border-radius: 0px 0px 40px 40px;
  background: #566246;
  width: 100%;
  padding: 20px 30px 20px;
  margin-bottom: -40px;
  z-index: 100;
  position: relative;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin: 10px;
`;

export const DateTag = styled.View`
  background-color: #d0d4bc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 10px;
  min-width: 60px;
`;

export const Tab = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

export const TabOption = styled.TouchableOpacity<Props>`
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({active}) => (active ? '#000000' : 'transparent')};
  padding-bottom: 10px;
`;

export const TabText = styled.Text``;

export const BookContainer = styled.View``;

export const NextContainer = styled.View`
  display: flex;
`;

export const Title = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

export const Text = styled.Text`
  color: #fff;
  font-family: Inter;
  font-size: 27px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 10px;
`;
