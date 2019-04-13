import React from 'react';
import { Image, Popup } from 'semantic-ui-react'

class PopUpConversation extends React.Component {

  state = {
    conversation: null,
    trigger: null
  }

  componentDidMount = () => {
    this.setState({ 
      conversation: this.props.conversation,
      trigger: this.props.trigger,
    });
  };

  formatedMessage = content => {
    return `Sala iniciada em ${content}`;
  }

  render = () => {
    const { conversation, trigger } = this.state;
    
    if(!conversation){
      return '';
    }

    return (
      <Popup
        key={conversation.id}
        trigger={trigger}
        header={conversation.title}
        content={this.formatedMessage(conversation.created_at)}
      />
      );
  };
}

export default PopUpConversation;
