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
    this.state.conversations = e
  }

  render() {
    
    const { conversations, activeConversation } = this.state;
    
    const findActiveConversation = (conversations, activeConversation) => {
      return conversations.find(
        conversation => conversation.id === activeConversation
      );
    };

    return (
      <Grid>
        <Grid.Row columns={14}>
          <Grid.Column style={{ margin: 20 }} width={4}>
              <ActionCableConsumer channel={{ channel: 'ConversationsChannel' }} onReceived={this.handleReceivedConversation} />
              <ConversationsList onRef={ref => (this.conversationsList = ref)} handleActiveConversation={this.handleActiveConversation} 
                handleConversations={this.handleConversations}/>
          </Grid.Column>

          <Grid.Column style={{ margin: 20 }} width={10}>
            {activeConversation ? (
              <MessagesArea
                  conversation={findActiveConversation(
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
