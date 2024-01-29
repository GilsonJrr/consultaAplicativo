import React, {FC, Fragment, ReactNode} from 'react';
import {StatusBar} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Styled from './styles';
import {NavigationType} from '../../Routes/types';
import Button from '../../components/Button';
import useKeyboardVisibility from '../../hooks/useKeyboardVisibility';

type ProfilePagesLayoutProps = {
  pageTitle: string;
  icon: string;
  buttonText: string;
  children?: ReactNode | ReactNode[];
  onPress?: () => void;
};

const ProfilePagesLayout: FC<ProfilePagesLayoutProps> = ({
  pageTitle,
  icon,
  buttonText,
  children,
  onPress,
}) => {
  const navigation = useNavigation<NavigationType>();
  const isKeyboardVisible = useKeyboardVisibility();

  return (
    <Fragment>
      <StatusBar animated={true} backgroundColor="#fcfef2" />
      <Styled.Warper>
        <Styled.Card>
          <Icon
            name="chevron-left"
            size={30}
            color="#fcfef2"
            onPress={() => navigation.goBack()}
          />
          <Styled.DisplayName>{pageTitle}</Styled.DisplayName>
          <Styled.CardIconContainer>
            <Icon name={icon} size={30} color="#566246" />
          </Styled.CardIconContainer>
        </Styled.Card>
        {children}
        {!isKeyboardVisible && (
          <Button onPress={onPress}>
            <Styled.DisplayName>{buttonText}</Styled.DisplayName>
          </Button>
        )}
      </Styled.Warper>
    </Fragment>
  );
};

export default ProfilePagesLayout;
