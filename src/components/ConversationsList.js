import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT, DEV_API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';
import { Card, Feed, Container } from 'semantic-ui-react';

let apiRoot;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    apiRoot = DEV_API_ROOT;
} else {
    apiRoot = API_ROOT;
}

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null
  };

  componentDidMount = () => {
    fetch(`${apiRoot}/conversations`)
      .then(res => res.json())
      .then(conversations => this.setState({ conversations }));
  };

  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

  render = () => {
    const { conversations, activeConversation } = this.state;
    return (
        <Card>
            <Card.Content>
                <NewConversationForm />
                <ActionCableConsumer
                channel={{ channel: 'ConversationsChannel' }}
                onReceived={this.handleReceivedConversation}
                />
                {this.state.conversations.length ? (
                <Cable
                    conversations={conversations}
                    handleReceivedMessage={this.handleReceivedMessage}
                />
                ) : null}
                <Container style={{ height: 100 }}>
                    <ul>{mapConversations(conversations, this.handleClick)}</ul>
                </Container>
                {activeConversation ? (
                <MessagesArea
                    conversation={findActiveConversation(
                    conversations,
                    activeConversation
                    )}
                />
                ) : null}
            </Card.Content>
        </Card>
    );
  };
}

export default ConversationsList;

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.created_at}
        {conversation.title}
      </li>
    );
  });
};

const CardExampleContentBlock = () => (
    <Card>
      <Card.Content>
        <Card.Header>Recent Activity</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Label image='/images/avatar/small/jenny.jpg' />
            <Feed.Content>
              <Feed.Date content='1 day ago' />
              <Feed.Summary>
                You added <a>Jenny Hess</a> to your <a>coworker</a> group.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
  
          <Feed.Event>
            <Feed.Label image='/images/avatar/small/molly.png' />
            <Feed.Content>
              <Feed.Date content='3 days ago' />
              <Feed.Summary>
                You added <a>Molly Malone</a> as a friend.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
  
          <Feed.Event>
            <Feed.Label image='/images/avatar/small/elliot.jpg' />
            <Feed.Content>
              <Feed.Date content='4 days ago' />
              <Feed.Summary>
                You added <a>Elliot Baker</a> to your <a>musicians</a> group.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
    );
  