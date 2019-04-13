import React from 'react';
import NewMessageForm from '../NewMessageForm';
import { Card } from 'semantic-ui-react';

const MessagesArea = ({
  conversation: { id, title, messages },
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <h2>{title}</h2>
        <ul>{orderedMessages(messages)}</ul>
        <NewMessageForm conversation_id={id} />
      </Card.Content>
    </Card>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  let sortedMessages = []
  if(messages){
    sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );  
  }else{
    sortedMessages = messages
  }
  
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.text}</li>;
  });
};