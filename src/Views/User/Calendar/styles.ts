import styled from 'styled-components/native';

type Props = {
  active?: boolean;
};

export const Wrapper = styled.SafeAreaView`
  padding: 0 20px;
  margin-top: 40px;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin: 10px;
`;

export const DateTag = styled.View`
  background-color: #d88977;
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
  width: 50%;
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
  margin: 20px;
  background-color: #f9e7e3;
  padding: 20px 5px;
  border-radius: 10px;
`;
