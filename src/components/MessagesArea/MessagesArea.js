import React from 'react';
import NewMessageForm from '../NewMessageForm';
import ListMessages from './ListMessages/ListMessages';
import { Card } from 'semantic-ui-react';
import Cable from '../Cable';

class MessagesArea extends React.Component {

  state = {
    conversation: null
  }

  componentDidMount = () => {
    this.props.onRef(this)    
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation: nextProps.conversation });
  }

  handleReceivedMessage = response => {
    this.listMessages.handleReceivedMessage(response);
  }

  render = () => {
    let {conversation} = this.state

    if(!conversation){
      return ''
    }

    return (
      <Card fluid style={{ height: '100%' }} >
        <Cable conversation={conversation} handleReceivedMessage={this.handleReceivedMessage} />
        <Card.Content>
          <h2>{conversation.title}</h2>
          <ListMessages 
            onRef={ref => (this.listMessages = ref)} 
            messages={conversation.messages} />
          <NewMessageForm conversation_id={conversation.id} />
        </Card.Content>
      </Card>
    );
  }
}

export default MessagesArea;

