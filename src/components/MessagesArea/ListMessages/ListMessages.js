import React from 'react';
import { List } from 'semantic-ui-react';


class ListMessages extends React.Component {

  state = {
    messages: []
  }

  
  componentDidMount = () => {
    this.props.onRef(this)    
  }

  
  componentWillReceiveProps = nextProps => {
    this.setState({ messages: nextProps.messages });
  }

  
  handleReceivedMessage = response => {
    const { message } = response;
    let messages = this.state.messages;
   
    messages = [...messages, message];
        
    this.setState({ messages });
  }

  orderedMessages = messages => {
    let sortedMessages = []
    
    if(messages){
      sortedMessages = messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );  
    }else{
      sortedMessages = messages
    }
        
    return sortedMessages.map(message => {
      return <List.Item key={message.id}>{message.text}</List.Item>
    });
  }

  render = () => {
    let {messages} = this.state

    if(messages.length < 1){
      return ''
    }

    return (
      <List style={{height: '100%'}}>
        {this.orderedMessages(messages)}
      </List>
    );
  }
}

export default ListMessages;

