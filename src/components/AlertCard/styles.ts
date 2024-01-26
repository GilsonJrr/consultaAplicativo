import styled from 'styled-components/native';

type Props = {
  type?: 'main';
};

export const Container = styled.ScrollView``;

export const Warper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #566246;
  left: 0;
  top: 0;
  padding: 50px 38px 0;
`;

export const AlertTitle = styled.Text`
  text-align: left;
  width: 100%;
  color: #fff;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 30px;
`;

export const AlertText = styled.Text`
  color: #c1bfbf;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 60px;
`;

export const CheckCircle = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 1000px;
  background-color: #f8fce1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
`;

export const Button = styled.Pressable<Props>`
  border-radius: 15px;
  background: ${({type}) => (type === 'main' ? '#d0d4bc' : '#F8FCE1')};
  padding: 14px;
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  color: #566246;
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
`;

export const ButtonContainer = styled.View`
  position: fixed;
  bottom: 40px;
`;
