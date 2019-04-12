import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import ConversationsList from './components/ConversationsList';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row columns={14}>
        <Grid.Column style={{ margin: 20 }} width={4}>
            <ConversationsList />
          </Grid.Column>
          <Grid.Column style={{ margin: 20 }} width={10}>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
