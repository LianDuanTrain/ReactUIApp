import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { nanoid } from 'nanoid';
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Header, Icon } from 'semantic-ui-react'
import { Form, Grid, Label } from 'semantic-ui-react'

export default class Add extends Component {
  state = {
    users: [
    ],
    firstName: '',
    lastName: ''
  }
  saveFormData = (dataType, event) => {
    this.setState({ [dataType]: event.target.value });
  }
  addUser = (event) => {
    const G = window.g
    event.preventDefault()
    const { firstName, lastName } = this.state
    console.log({ firstName }, { lastName })
    const { users } = this.state
    console.log('add user start')
    const newUser = { id: nanoid(), firstName: firstName, lastName: lastName };
    users.push(newUser)
    console.log({ users })
    axios.post(G.url + '/users', {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName
    })
      .then(function (response) {
        console.log("add user response",response);
        // send message to addUsersInfo
        PubSub.publish('addUsersInfo', { users })
      })
      .catch(function (error) {
        console.log("add user error",error);
      });
    this.setState({ firstName: '', lastName: '', users: [] });
    console.log('add user end')
    console.log('state = ', this.state)


  }
  render() {
    return (

      <Grid columns={1} divided='vertically'>
        <Grid.Column>
          <Container textAlign='left'> <Header size='large' color='green'><Icon name='settings' />Add User</Header></Container>
        </Grid.Column>

        <Grid.Column columns={3}>
          <Grid.Row>
            <Container textAlign='left'>
              <Form onSubmit={this.addUser}>
                <Grid.Column>
                  <Label pointing='below'>Please enter First Name</Label>
                  <Form.Input placeholder='First Name' size='small' onChange={event => this.saveFormData('firstName', event)} value={this.state.firstName} style={{ width: 140, height: 10 }} />
                  <Label pointing='below'>Please enter Last Name</Label>
                  <Form.Input placeholder='Last Name' size='small' onChange={event => this.saveFormData('lastName', event)} value={this.state.lastName} style={{ width: 140, height: 10 }} />

                  <Button size='small' color='green'>Add User</Button>
                </Grid.Column>
              </Form>
            </Container>
          </Grid.Row>
        </Grid.Column>
      </Grid>

    )
  }
}
