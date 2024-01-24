import styled from 'styled-components/native';

export const SearchButtonText = styled.Text`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
`;

export const SearchButton = styled.Pressable`
  width: 30%;
  height: 39px;
  flex-shrink: 0;
  border-radius: 7px;
  border: 1px solid #221503;
  background: #db8876;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MassageContainer = styled.View`
  padding: 10px 15px;
  border-radius: 15px;
  background: #f8fce1;
  border-radius: 10px;
  border-radius: 10px;
  /* box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); */
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

export const MassageInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  margin-left: 100px;
`;

export const MassageTextContainer = styled.View`
  width: 70%;
  display: flex;
  align-items: flex-start;
`;

export const MassageImg = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 15px;
  background: #f8fce1;
  margin-top: 5px;
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: 0;
`;

export const MassageTitle = styled.Text`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const MassageSubtitle = styled.Text`
  color: #6e6e6e;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

export const BookMassageButton = styled.Pressable`
  border-radius: 4px;
  background: #d0d4bc;
  margin: 20px auto 0 0;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 100px;
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
