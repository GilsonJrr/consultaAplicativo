import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fcfef2;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  padding: 20px 30px;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

export const CheckoutContent = styled.ScrollView``;

export const CheckoutContentWrapper = styled.View`
  padding-bottom: 100px;
`;

export const ServiceResume = styled.View`
  border-radius: 20px;
  background: #d0d4bc;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const ServiceResumeCard = styled.View`
  border-radius: 13px;
  background: #f8fce1;
  width: 48%;
  padding: 11px 0;
`;

export const ServiceResumeText = styled.Text`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

export const ServiceResumeSubText = styled.Text`
  color: #696969;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const Title = styled.Text`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 20px;
`;

export const Description = styled.Text`
  color: #696969;
  text-align: justify;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 20px;
`;

export const Text = styled.Text`
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin: 10px 0 4px 0;
`;

export const MassageImg = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px 34px 15px 30px;
  margin: 5px auto;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 30px;
  margin: 0px auto;
`;

export const Button = styled.Pressable`
  border-radius: 15px;
  background: #566246;
  width: 60%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GoBackButton = styled.Pressable`
  position: absolute;
  left: 30px;
`;

export const ButtonText = styled.Text`
  color: #f8f8f8;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
`;
