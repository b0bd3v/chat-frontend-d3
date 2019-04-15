import React from 'react';
import { List, Label } from 'semantic-ui-react';
import { randomAvatar, guid } from '../../../helper/Faker';


class ItemMessage extends React.Component {

  state = {
    message: null
  }
  
  componentDidMount = () => {
    if(this.props.message){
      this.setState({ message: this.props.message });
    }
  }
  
  render = () => {
    let {message} = this.state;
   
    if(!message){ return '' }

    return (
        <List.Item>
            <Label as='a' image>
                <img src={randomAvatar(message.user_id)} alt={message.text} />
                {message.text}
            </Label>
        </List.Item>
    );
  }
}

export default ItemMessage;

