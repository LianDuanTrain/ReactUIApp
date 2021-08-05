import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { Button } from 'semantic-ui-react'
import { List, Image } from 'semantic-ui-react'
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
                 
            <List.Item>          
            <Image avatar src='images/rachel.png' />
              
               <List.Content> First Name: {firstName} Last Name: {lastName} 
               {' '}  <Button size='small' color='green' onClick={this.deleteItem(id)}>Delete</Button> 
            </List.Content>    
                </List.Item>
               
        )
    }
}
