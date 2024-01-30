import styled from 'styled-components/native';

type Props = {
  disabled?: boolean;
};

export const ButtonWarper = styled.TouchableOpacity<Props>`
  width: 100%;
  background-color: #566246;
  padding: 10px;
  border-radius: 15px;
  opacity: ${({disabled}) => (disabled ? '0.5' : 1)};
`;
