import React from 'react';
import { API_ROOT, DEV_API_ROOT, HEADERS } from '../constants';
import { Form } from 'semantic-ui-react';

let apiRoot;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    apiRoot = DEV_API_ROOT;
} else {
    apiRoot = API_ROOT;
}

class NewMessageForm extends React.Component {
  state = {
    text: '',
    conversation_id: this.props.conversation_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${apiRoot}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: '' });
  };

  render = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <input placeholder='Mensagem' value={this.state.text} onChange={this.handleChange}/>
        </Form.Field>
      </Form>      
    );
  };
}

export default NewMessageForm;