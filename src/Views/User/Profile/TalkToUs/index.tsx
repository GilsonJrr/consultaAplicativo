import React from 'react';

import * as Styled from './styles';
import ProfilePagesLayout from '../../../../layouts/ProfilePages';
import DropDown from '../../../../components/DropDown';

const TalkToUs = () => {
  return (
    <ProfilePagesLayout
      pageTitle={'Fale conosco'}
      icon={'forum'}
      buttonText={'Enviar'}>
      <Styled.InputContainer>
        <Styled.Label>Asunto</Styled.Label>
        <DropDown
          initialValue={'Sobre o atemdimento'}
          options={[
            {label: 'Sobre o atemdimento', value: 'Sobre o atemdimento'},
            {label: 'Sobre o aplicativo', value: 'Sobre o aplicativo'},
          ]}
        />

        <Styled.Label>Sua mensagem</Styled.Label>
        <Styled.Input
          multiline
          textAlignVertical="top"
          numberOfLines={100}
          placeholder="Fale sobre sua experiencia sobre o assunto selecionado"
        />
      </Styled.InputContainer>
    </ProfilePagesLayout>
  );
};

export default TalkToUs;
