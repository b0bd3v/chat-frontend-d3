import React from 'react';
import NewMessageForm from './NewMessageForm';
import ListMessages from './ListMessages/ListMessages';
import { Card } from 'semantic-ui-react';
import Cable from '../Cable';

class MessagesArea extends React.Component {

  state = {
    conversation: null
  }

  constructor(props) {
    super(props);
    this.messagesContent = React.createRef();
  }
  
  componentDidMount = () => {
    this.setState({ conversation: this.props.conversation });
    this.scrollToBottom();
  }

  componentDidUpdate = () => {
    this.scrollToBottom();
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation: nextProps.conversation });
    this.scrollToBottom();
  }

  handleReceivedMessage = response => {
    this.listMessages.handleReceivedMessage(response);
    this.scrollToBottom();  
  }

  scrollToBottom = () => {
    setTimeout(() => {
      if(this.messagesContent.current){
        this.messagesContent.current.scrollTop = this.messagesContent.current.scrollHeight;
      }
    }, 100);    
  }

  render = () => {
    let {conversation} = this.state
    
    if(!conversation){ return '' }

    if(!conversation.messages){ conversation.messages = [] }

    return (
      <Card fluid style={{ height: '100%' }} >
        <Cable conversation={conversation} handleReceivedMessage={this.handleReceivedMessage} />
        <Card.Content header={<h2>{conversation.title}</h2>}/>        
        <div className="content" style={{overflow:'auto', maxHeight: 600}} ref={this.messagesContent}>
          <ListMessages
            onRef={ref => (this.listMessages = ref)} 
            messages={conversation.messages} />
        </div>
        <Card.Content >
          <NewMessageForm conversation_id={conversation.id} />
        </Card.Content>
      </Card>
    );
  }
}

export default MessagesArea;

