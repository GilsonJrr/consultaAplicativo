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
  showGoBack?: boolean;
  disabledButton?: boolean;
};

const ProfilePagesLayout: FC<ProfilePagesLayoutProps> = ({
  pageTitle,
  icon,
  buttonText,
  children,
  onPress,
  showGoBack = true,
  disabledButton,
}) => {
  const navigation = useNavigation<NavigationType>();
  const isKeyboardVisible = useKeyboardVisibility();

  return (
    <Fragment>
      <StatusBar animated={true} backgroundColor="#fcfef2" />
      <Styled.Warper>
        <Styled.Card>
          {showGoBack ? (
            <Icon
              name="chevron-left"
              size={30}
              color="#fcfef2"
              onPress={() => navigation.navigate('Profile')}
            />
          ) : (
            <Icon name="" size={30} color="#fcfef2" />
          )}
          <Styled.DisplayName>{pageTitle}</Styled.DisplayName>
          <Styled.CardIconContainer>
            <Icon name={icon} size={30} color="#566246" />
          </Styled.CardIconContainer>
        </Styled.Card>
        {children}
        {!isKeyboardVisible && (
          <Button onPress={onPress} disabled={disabledButton}>
            <Styled.DisplayName>{buttonText}</Styled.DisplayName>
          </Button>
        )}
      </Styled.Warper>
    </Fragment>
  );
};

export default ProfilePagesLayout;
