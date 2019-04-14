import React from 'react';
import { List } from 'semantic-ui-react';
import { orderByDate, findItemByAttribute } from '../../../helper/DataManipulation';


class ListMessages extends React.Component {

  state = {
    messages: []
  }
  
  componentDidMount = () => {
    this.props.onRef(this);
    if(this.props.messages){
      this.setState({ messages: this.props.messages });
    }
  }
  
  componentWillReceiveProps = nextProps => {
    this.setState({ messages: nextProps.messages });
  }

  handleReceivedMessage = response => {
    let messages = this.state.messages;
    if(messages && !findItemByAttribute(messages, 'id', response.message.id)){
      messages.push(response.message);
      this.setState({ messages });
    }
  }

  orderedMessages = messages => {
    messages = orderByDate(messages, 'created_at', 'asc');
    return messages.map(message => {
      return <List.Item key={`${message.conversation_id}_${message.id}`}>{message.text}</List.Item>
    });
  }

  render = () => {
    let {messages} = this.state
    if(!messages){ return '' }

    return (
      <List>
        <div style={{height: 600}}></div>
        {this.orderedMessages(messages)}
      </List>
    );
  }
}

export default ListMessages;

