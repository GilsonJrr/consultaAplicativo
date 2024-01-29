import styled from 'styled-components/native';

type Props = {
  type?: 'main';
};

export const Container = styled.View`
  background-color: #566246;
  width: 100%;
  height: 100%;
  padding: 30px 20px 0;
`;

export const AlertTitle = styled.Text`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
`;

export const AlertText = styled.Text`
  color: #c1bfbf;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

export const Card = styled.View`
  border-radius: 12px;
  background: #717e60;
  padding: 20px 10px;
  gap: 10px;
  margin: 33px 0 0;
`;

export const CardText = styled.Text<Props>`
  color: ${({type}) => (type === 'main' ? '#d0d4bc' : '#FFFFFF')};
  text-align: center;
  font-family: Inter;
  font-size: ${({type}) => (type === 'main' ? '14px' : '16px')};
  font-style: normal;
  font-weight: 700;
  width: ${({type}) => (type === 'main' ? '30%' : '70%')};
`;

export const CardTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Button = styled.Pressable<Props>`
  border-radius: 15px;
  background: ${({type}) => (type === 'main' ? '#d0d4bc' : '#F8FCE1')};
  padding: 10px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  width: ${({type}) => (type === 'main' ? '30%' : '65%')};
`;

export const ButtonText = styled.Text<Props>`
  color: #566246;
  text-align: center;
  font-family: Inter;
  font-size: ${({type}) => (type === 'main' ? '22px' : '12px')};
  font-style: normal;
  font-weight: 400;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin-left: 30px;
`;
