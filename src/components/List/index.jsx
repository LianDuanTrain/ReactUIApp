import React, { Component } from 'react'
import Item from '../Item'
import PubSub from 'pubsub-js'
import axios from 'axios'
export default class index extends Component {
    state = {users:[
    ]}

componentDidMount(){
     PubSub.subscribe('addUsersInfo',(_,stateObj) =>{
        console.log('update list')
     //   console.log(this.state.users)
      //  this.setState(stateObj)
     //   console.log(this.state.users)
        axios.get('/users')
        .then((response) => {
          console.log("response is ",response.data);
          this.setState({users:response.data})
        })
        .catch( (error)=> {
          console.log(error);
        });

    }
    );
        PubSub.subscribe('deleteUsersInfo',(_,deleteID) =>{
        console.log('delete user ',deleteID )
        const {id} = deleteID
        console.log('id',id)
        const {users} = this.state
      const filtered = users.filter(function(value, index, arr){
        return value.id !== id
      })
      this.setState({users:filtered})
      const deleteUrl = '/users/'+id;
      console.log('deleteUrl',deleteUrl)
      axios.delete(deleteUrl).then((response) => {
        console.log("delete response is ",response);
      //  this.setState({users:response})
      })
      .catch( (error)=> {
        console.log(error);
      });
       // console.log('filtered',filtered)   
    });

        console.log(this.state.users)
    }

componentWillUnmount(){
    PubSub.unsubscribe('addUsersInfo');
    PubSub.unsubscribe('deleteUsersInfo');
}

    render() {
        const {users} = this.state
        return (
            <ul>
                { 
                    users.map(
                       user=>{
                           return <Item key={user.id.toString()} id = {user.id} firstName={user.firstName} lastName= {user.lastName}/>
                       }
                 )
                 }
            </ul>
        )
    }
}
