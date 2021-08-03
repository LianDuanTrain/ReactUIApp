import React, { Component } from 'react'
import PubSub from 'pubsub-js'
export default class index extends Component {
    deleteItem = (id)=>{
       return ()=>{
        console.log("Deelte Item id is "+id)
        PubSub.publish('deleteUsersInfo',{id})
       } 
        }
    render() {
        const {id,firstName,lastName} = this.props
        return (          
            <li >
                ID: {id} First Name: {firstName} Last Name: {lastName}   <button onClick={this.deleteItem(id)}>Delete</button>     
            </li>
        )
    }
}
