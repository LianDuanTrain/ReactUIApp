import React, { Component } from 'react'
import Item from '../Item'
import PubSub from 'pubsub-js'
import axios from 'axios'
import { List } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Header, Icon } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'
export default class index extends Component {
  state = {
    users: [
    ]
  }

  componentDidMount() {
    console.log('componentDidMount called')
    PubSub.subscribe('addUsersInfo', (_, stateObj) => {
      console.log('update list')
      //   console.log(this.state.users)
      //  this.setState(stateObj)
      console.log('add user call')
      const G = window.g
      axios.get(G.url + '/users')
        .then((response) => {
          console.log("response is ", response.data);
          this.setState({ users: response.data })
        })
        .catch((error) => {
          console.log("add user error",error);
        });

    }
    );
    PubSub.subscribe('deleteUsersInfo', (_, deleteID) => {
      console.log('delete user ', deleteID)
      const { id } = deleteID
      console.log('id', id)
      const { users } = this.state
      const filtered = users.filter(function (value, index, arr) {
        return value.id !== id
      })
      this.setState({ users: filtered })
      const G = window.g
      const deleteUrl = G.url + '/users/' + id;
      console.log('deleteUrl', deleteUrl)
      console.log('delete user call')
      axios.delete(deleteUrl).then((response) => {
        console.log("delete response is ", response);
        //  this.setState({users:response})
      })
        .catch((error) => {
          console.log('delete error', error);
        });  
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe('addUsersInfo');
    PubSub.unsubscribe('deleteUsersInfo');
  }

  render() {
    const { users } = this.state
    return (
      <Grid columns={1} divided='vertically'>

        <Grid.Column>
          <Container textAlign='left'> <Header size='large' color='green'><Icon name='users' />User List</Header></Container>
        </Grid.Column>
        <Grid.Column>
        <Container textAlign='left'>
          <List>
            {
              users.map(
                user => {
                  return <Item key={user.id.toString()} id={user.id} firstName={user.firstName} lastName={user.lastName} />
                }
              )
            }
          </List>
          </Container>
        </Grid.Column>

      </Grid>
    )
  }
}
