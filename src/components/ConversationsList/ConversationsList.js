import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT, DEV_API_ROOT } from '../../constants';
import NewConversationForm from '../NewConversationForm';
import MessagesArea from '../MessagesArea';
import Cable from '../Cable';
import './ConversationsList.sass';
import { Card, Feed, Container, Button, Image, List} from 'semantic-ui-react';

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
    fetch(`${apiRoot}/conversations`).then(res => {
      return res.json()
    }).then(conversations => {
      conversations.reverse();
      this.setState({ conversations });
    });
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
                <Container style={{ height: '100%' }}>
                    <List divided verticalAlign='middle'>
                      {mapConversations(conversations, this.handleClick)}
                    </List>
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

const randomAvatar = () => {
  const avatarList = [
    '/images/avatar/small/veronika.jpg',
    '/images/avatar/small/rachel.png',
    '/images/avatar/small/matthew.png',
    '/images/avatar/small/lindsay.png',
    '/images/avatar/small/jenny.jpg'
  ];
  return avatarList[Math.floor(Math.random() * avatarList.length)];
}

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  conversations.reverse();
  return conversations.map(conversation => {
    return (
      <List.Item key={conversation.id} onClick={() => handleClick(conversation.id)}>
        <List.Content floated='right'>
          <Button size='mini'>Add</Button>
        </List.Content>
        <Image avatar src={randomAvatar()} />
        <List.Content>
          {/* conversation.created_at */}{conversation.title}
        </List.Content>
      </List.Item>  
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
  