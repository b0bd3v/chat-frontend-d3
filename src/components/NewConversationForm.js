import React from 'react';
import { API_ROOT, DEV_API_ROOT, HEADERS } from '../constants';
import { Form, Input, Icon } from 'semantic-ui-react'

let apiRoot;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    apiRoot = DEV_API_ROOT;
} else {
    apiRoot = API_ROOT;
}

class NewConversationForm extends React.Component {
  state = {
    title: ''
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${apiRoot}/conversations`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ title: '' });
  };

  render = () => {
    return (
      <Form>
        <Input icon={<Icon name='plus' inverted circular link onClick={this.handleSubmit} />} placeholder='Nova sala' value={this.state.title} onChange={this.handleChange} />
      </Form>
    );
  };
}

export default NewConversationForm;