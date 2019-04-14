import React, { Component } from 'react';
import MessagesArea from './components/MessagesArea/MessagesArea';
import ConversationsList from './components/ConversationsList/ConversationsList';
import EmptyMessageArea from './components/MessagesArea/EmptyMessageArea';
import { findItemByAttribute } from './helper/DataManipulation';
import { Grid, Container } from 'semantic-ui-react';
import { ActionCableConsumer } from 'react-actioncable-provider';

class App extends Component {
  
  conversations = []
  
  state = {
    conversations: [],
    activeConversation: null
  };

  handleReceivedConversation = e => {
    this.conversationsList.handleReceivedConversation(e);
    this.conversations = this.conversationsList.state.conversations;
    if(findItemByAttribute( this.conversations, 'id', e.conversation.id)){
      this.handleActiveConversation(e.conversation.id);
    }
  };

  handleActiveConversation = id => {
    this.setState({ activeConversation: id });
  };
  
  handleConversations = e => {
    this.conversations = e;
  }

  handleReceivedMessage = response => {
    this.messagesArea.handleReceivedMessage(response)
  }

  render() {
    
    const activeConversation = this.state.activeConversation;
    
    return (
      <Container style={{ height: '60%', marginTop: '3%' }}>
        <Grid style={{ height: '100%' }}>
          <Grid.Row>
            <Grid.Column style={{ marginTop: 20, marginLeft: 20 }} width={5}>
                
                <ActionCableConsumer channel={{ channel: 'ConversationsChannel' }} onReceived={this.handleReceivedConversation} />
               
                <ConversationsList 
                  onRef={ref => (this.conversationsList = ref)} 
                  handleActiveConversation={this.handleActiveConversation} 
                  handleConversations={this.handleConversations} />

            </Grid.Column>

            <Grid.Column style={{ marginTop: 20 }} width={10}>
            
            {activeConversation ? (
                <MessagesArea
                    onRef={ref => (this.messagesArea = ref)} 
                    conversation={findItemByAttribute( this.conversations, 'id', activeConversation)}
                />
                ) : (
                  <EmptyMessageArea/>
                )                
            }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
