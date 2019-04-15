import React from 'react';
import { randomAvatar } from '../../helper/Faker';
import { orderByDate, findItemByAttribute } from '../../helper/DataManipulation';
import { API_ROOT, DEV_API_ROOT } from '../../constants';
import NewConversationForm from './NewConversationForm';
import PopUpConversation from './PopUpConversation/PopUpConversation';
import { Card, Icon, Container, Image, List} from 'semantic-ui-react';

let apiRoot;

if (process.env.NODE_ENV === 'development') {
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
    this.props.onRef(this)
    this.loadConversations()
  };

  loadConversations = () => {
    fetch(`${apiRoot}/conversations`).then(res => {
      return res.json()
    }).then(conversations => {
      this.props.handleConversations(conversations);
      conversations = orderByDate(conversations, 'created_at');
      this.setState({ conversations });
    });
  }

  handleActiveConversation = id => {
    this.loadConversations()
    this.props.handleActiveConversation(id)
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const conversation = response.conversation;
    if(response.action === 'delete'){
      this.removeConversation(conversation);
    }else{
      let conversations = this.state.conversations;      
      if(!findItemByAttribute(conversations, 'id', conversation.id)){
        conversations.push(conversation);
        this.setState({
          conversations: conversations
        });

      }        
    }
  };

  removeConversation = (conversation) => {
    
    let conversations = this.state.conversations.filter(conv => conv.id !== conversation.id)
    if(conversations === null){ conversations = []}
    this.setState({
      conversations
    });
    
    if(this.state.activeConversation === conversation.id || !this.state.activeConversation){
      if(this.state.conversations.length > 0){
        this.handleActiveConversation(this.state.conversations[0].id);
      } else {
        this.handleActiveConversation(null);
      }
    }

  }

  handleDelete = id => {
    fetch(`${apiRoot}/conversations/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      if(response.ok === true){
        
      }
    });
  };

  mapConversations = (conversations, handleActiveConversation, handleDelete, orderConversationByDate) => {
    conversations = orderByDate(conversations, 'created_at');
  
    return conversations.map((conversation, index) => {
      if(conversation === undefined){
        return ''
      }
      return (
        
          <List.Item key={conversation.id}>
            <List.Content floated='right'>
              <Icon link name='close' style={{marginTop: 7}} onClick={ () => handleDelete(conversation.id) } />
            </List.Content>
          
            <PopUpConversation key={conversation.id}
              trigger={
                <Image style={{cursor: 'pointer'}} avatar src={randomAvatar(conversation.user_id)} onClick={() => handleActiveConversation(conversation.id)}/>
              }
              conversation={conversation}
            />
  
            <List.Content style={{cursor: 'pointer'}} onClick={() => handleActiveConversation(conversation.id)}>
              {conversation.title}
            </List.Content>
  
          </List.Item>
        
        );
    });
  }

  render = () => {
    const { conversations } = this.state;
    
    return (
      <Card fluid style={{ height: '100%'}}>
      <Card.Content style={{ overflow: 'auto' }}>
      <NewConversationForm />
      <Container>
      <List divided verticalAlign='middle'>
        {this.mapConversations(conversations, this.handleActiveConversation, this.handleDelete, this.orderConversationByDate)}
      </List>
      </Container>
      </Card.Content>
      </Card>
      );
  };
}

export default ConversationsList;

