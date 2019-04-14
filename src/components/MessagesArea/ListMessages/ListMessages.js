import React from 'react';
import { List } from 'semantic-ui-react';
import { orderByDate, findItemByAttribute } from '../../../helper/DataManipulation';
import ItemMessage from './ItemMessage';


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
      return <ItemMessage  key={`${message.conversation_id}_${message.id}`} message={message} />      
    });
  }

  render = () => {
    let {messages} = this.state;
    
    if(!messages){ return '' }

    return (
      <List>
        <List.Item key="dummy" style={{height: 600}}></List.Item>
        {this.orderedMessages(messages)}
      </List>
    );
  }
}

export default ListMessages;

