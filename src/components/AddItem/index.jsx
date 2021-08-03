import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { nanoid } from 'nanoid';
import axios from 'axios'
export default class Add extends Component {
    state = {users:[       
    ],
    firstName:'',
    lastName:''
    }
    saveFormData = (dataType,event)=>{
          this.setState({[dataType]:event.target.value});
    }
    addUser = (event)=>{
        event.preventDefault()
        const{firstName,lastName} = this.state
        console.log({firstName},{lastName})
        const {users} = this.state    
        console.log('add user start')      
        const newUser = {id: nanoid(), firstName: firstName,lastName:lastName };
        users.push(newUser)
        console.log({users})
        axios.post('/users', {
            id:newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        PubSub.publish('addUsersInfo',{users})
        this.setState({firstName:'',lastName:'',users:[]});
        console.log('add user end')
        console.log('state = ',this.state)

       
    }
    render() {
        return (
            <div>
            <form onSubmit={this.addUser}>
                <p>Add User</p>
                <label>
                <label htmlFor="firstName">First name:</label>
                <input type="text" onChange={event => this.saveFormData('firstName',event)}  name="firstName" value={this.state.firstName}/>
                <label htmlFor="lastName">Last name:</label>
                <input type="text"  onChange={event => this.saveFormData('lastName',event)} name="lastName" value={this.state.lastName}/>
                <button  value="add">Add User</button>
                </label>
                </form>
            </div>
        )
    }
}
