import React, { Fragment } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

const Cable = ({ conversation, handleReceivedMessage }) => {
  return (
    <Fragment>
      <ActionCableConsumer
        key={conversation.id}  
        channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
        onReceived={handleReceivedMessage}
      />
    </Fragment>
  );
};

export default Cable;