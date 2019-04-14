import React, { Component } from 'react';
import MessagesArea from './components/MessagesArea/MessagesArea';
import ConversationsList from './components/ConversationsList/ConversationsList';
import { Grid } from 'semantic-ui-react';
import { ActionCableConsumer } from 'react-actioncable-provider';

class App extends Component {
  
  state = {
    conversations: [],
    activeConversation: null
  };

  handleReceivedConversation = e => {
    this.conversationsList.handleReceivedConversation(e);
  };

  handleActiveConversation = id => {
    this.setState({ activeConversation: id });
  };
  
  handleConversations = e => {
    this.setState({ conversations: e });
  }

  handleReceivedMessage = response => {
    this.messagesArea.handleReceivedMessage(response)
  }

  findActiveConversation = (conversations, activeConversation) => {
    return conversations.find(
      conversation => conversation.id === activeConversation
    );
  }
  

  render() {
    
    const activeConversation = this.state.activeConversation;
    
    return (
      <Grid style={{ height: '100%' }}>
        <Grid.Row>
          <Grid.Column style={{ marginTop: 20, marginLeft: 20 }} width={3}>
              
              <ActionCableConsumer channel={{ channel: 'ConversationsChannel' }} onReceived={this.handleReceivedConversation} />
              
              <ConversationsList 
                onRef={ref => (this.conversationsList = ref)} 
                handleActiveConversation={this.handleActiveConversation} 
                handleConversations={this.handleConversations} />

          </Grid.Column>

          <Grid.Column style={{ marginTop: 20 }} width={12}>
          {activeConversation ? (
              <MessagesArea
                  onRef={ref => (this.messagesArea = ref)} 
                  conversation={this.findActiveConversation(
                  this.state.conversations,
                  activeConversation
                  )}
              />
              ) : null}
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
