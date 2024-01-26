import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fcfef2;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 20px 30px;
`;

export const Logo = styled.View`
  background-color: #d9d9d9;
  width: 60px;
  height: 50px;
  border-radius: 80px 0px 70px 13px;
  margin-bottom: 43px;
`;

export const Title = styled.Text`
  color: #566246;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
`;

export const Text = styled.Text`
  color: #566246;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
`;

export const AlreadyRegisteredContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AlreadyRegisteredButton = styled.Pressable``;

export const AlreadyRegistered = styled.Text`
  color: #566246;
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
`;

export const ContentScroll = styled.ScrollView`
  width: 100%;
  margin-top: 48px;
`;

export const Input = styled.TextInput`
  border-radius: 15px;
  border: 1px solid #566246;
  background: #f8fce1;
  width: 100%;
  margin-bottom: 14px;
  padding: 6px;
`;

export const Button = styled.Pressable`
  border-radius: 15px;
  background: #566246;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

export const ButtonText = styled.Text`
  color: #f8fce1;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
`;
