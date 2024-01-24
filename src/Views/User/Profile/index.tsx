import React, {Fragment} from 'react';
import * as Styled from './styles';
import {ageCalculator} from '../../../utils';

const Profile = () => {
  const user = {
    name: 'Gilson cosme',
    age: ageCalculator('12/07/1991'),
    gender: 'masculino',
  };

  console.log(user);

  return (
    <Fragment>
      <Styled.Header>
        <Styled.PhotoContainer />
      </Styled.Header>
      <Styled.Warper>
        <Styled.InputContainer>
          <Styled.Label>Nome</Styled.Label>
          <Styled.Input placeholder={user.name} />
          <Styled.Label>Idade</Styled.Label>
          <Styled.Input placeholder={user.age.toString()} />
          <Styled.Label>Sexo</Styled.Label>
          <Styled.Input placeholder={user.gender} />
        </Styled.InputContainer>
      </Styled.Warper>
    </Fragment>
  );
};

export default Profile;
