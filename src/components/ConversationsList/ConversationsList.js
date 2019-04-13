import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT, DEV_API_ROOT } from '../../constants';
import NewConversationForm from '../NewConversationForm';
import MessagesArea from '../MessagesArea';
import Cable from '../Cable';
import './ConversationsList.sass';
import { Card, Icon, Container, Button, Image, List} from 'semantic-ui-react';

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

  orderConversationByDate = (conversations) => {
    if(Array.isArray(conversations)){
      conversations.sort(function(a,b){
        return new Date(b.created_at) - new Date(a.created_at);
      });  
    }    
    return conversations;
  }

  componentDidMount = () => {
    
    this.props.onRef(this)

    fetch(`${apiRoot}/conversations`).then(res => {
      return res.json()
    }).then(conversations => {
      this.props.handleConversations(conversations);
      conversations = this.orderConversationByDate(conversations);
      this.setState({ conversations });
    });

  };

  handleActiveConversation = id => {
    this.props.handleActiveConversation(id)
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const conversation = response.conversation;
    if(response.action === 'delete'){
      this.setState({
        conversations: this.state.conversations.filter(conv => conv.id !== conversation.id)
      });  
    }else{
      this.setState({
        conversations: [...this.state.conversations, conversation]
      });  
    }
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

  handleDelete = id => {
    fetch(`${apiRoot}/conversations/${id}`, {
      method: 'DELETE'
    });
  };

  render = () => {
    const { conversations, activeConversation } = this.state;
    
    return (
        <Card>
            <Card.Content>
                <NewConversationForm />
                {this.props.conversationsChannelResponse}
                {this.state.conversations.length ? (
                <Cable
                    conversations={conversations}
                    handleReceivedMessage={this.handleReceivedMessage}
                />
                ) : null}
                <Container style={{ height: '100%' }}>
                    <List divided verticalAlign='middle'>
                      {mapConversations(conversations, this.handleActiveConversation, this.handleDelete, this.orderConversationByDate)}
                    </List>
                </Container>
            </Card.Content>
        </Card>
    );
  };
}

export default ConversationsList;

const randomAvatar = (id) => {
  const avatarList = [
    '/images/rooms/doge.jpg',
    '/images/rooms/cat.jpg',
    '/images/avatar/small/veronika.jpg',
    '/images/avatar/small/rachel.png',
    '/images/avatar/small/matthew.png',
    '/images/avatar/small/lindsay.png',
    '/images/avatar/small/jenny.jpg'
  ];

  const strNumber = id.toString();
  
  let number = strNumber.substring(strNumber.length -1, strNumber.length)

  while(number >= avatarList.length){
    number = (number - avatarList.length)
  }

  return avatarList[number];
}

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};


const mapConversations = (conversations, handleActiveConversation, handleDelete, orderConversationByDate) => {
  conversations = orderConversationByDate(conversations);

  return conversations.map((conversation, index) => {
    if(conversation === undefined){
      return ''
    }
    return (
      <List.Item key={conversation.id}>
        <List.Content floated='right'>
          <Icon link name='close' style={{marginTop: 7}} onClick={ () => handleDelete(conversation.id) } />
        </List.Content>
        <Image avatar src={randomAvatar(conversation.id)} />
        <List.Content onClick={() => handleActiveConversation(conversation.id)}>
          {/* conversation.created_at */}{conversation.title}
        </List.Content>
      </List.Item>  
    );
  });
};
  