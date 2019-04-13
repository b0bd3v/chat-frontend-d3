import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

import ConversationsList from './components/ConversationsList/ConversationsList';
import { Grid } from 'semantic-ui-react';
import { ActionCableConsumer } from 'react-actioncable-provider';

class App extends Component {
  
  handleReceivedConversation = e => {
    this.conversationsList.handleReceivedConversation(e);
  }
  

  render() {
    return (
      <Grid>
        <Grid.Row columns={14}>
        <Grid.Column style={{ margin: 20 }} width={4}>
            <ActionCableConsumer channel={{ channel: 'ConversationsChannel' }} onReceived={this.handleReceivedConversation} />
            <ConversationsList onRef={ref => (this.conversationsList = ref)} />
          </Grid.Column>
          <Grid.Column style={{ margin: 20 }} width={10}>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
