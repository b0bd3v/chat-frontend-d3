import React from 'react';
import { Card, Image } from 'semantic-ui-react';

class EmptyMessageArea extends React.Component {

  render = () => {

    return (
      <Card fluid style={{ height: '100%' }} >
        <Card.Content style={{ textAlign: 'center', paddingTop: 70 }}>
            <h1>Bem vindo</h1>  
            <p>
              Exercício para avaliação D3.
              Desenvolvido com React e Ruby on Rails.
            </p>
            <p>
              <i>Selecione ou crie uma conversa.</i>
            </p>
            <Image width={70} src={'/images/react-logo.svg'} />
            <Image width={70} src={'/images/rails-logo.svg'} />
        </Card.Content>
      </Card>
    );
  }
}

export default EmptyMessageArea;

