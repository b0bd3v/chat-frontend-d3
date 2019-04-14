import React from 'react';
import { List, Label } from 'semantic-ui-react';
import { orderByDate, findItemByAttribute } from '../../../helper/DataManipulation';
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
    console.log(message);
    
    if(!message){ return '' }

    return (
        <List.Item key={`${message.conversation_id}_${message.id}`}>
            <Label as='a' image>
                <img src={randomAvatar(guid())} />
                {message.text}
            </Label>
        </List.Item>
    );
  }
}

export default ItemMessage;

