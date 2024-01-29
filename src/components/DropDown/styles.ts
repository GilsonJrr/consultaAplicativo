import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';

export const InputWarper = styled.View`
  width: 100%;
  flex-shrink: 0;
  border-radius: 10px;
  background: #ffffff;
  margin: 0 0 10px 0;
  border: 1px solid #566246;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  z-index: 100;
  position: relative;
`;

export const IconWarper = styled.View`
  position: absolute;
  z-index: 300;
  left: 15px;
`;

export const DropDown = styled(DropDownPicker)`
  font-size: 20px;
  color: #566246;
  border: transparent;
  z-index: 200;
`;
