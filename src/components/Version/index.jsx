import React, { Component } from 'react'
import axios from 'axios'
import { Segment } from 'semantic-ui-react'
export default class Add extends Component {
  state = {
    appVersion: 'loading...'
  }

  async componentDidMount() {
    const G = window.g
    //  this.setState({ appVersion: 'v99' })
    // let { appVersion } = this.state
    const response = await axios.get(G.url + '/version');
    this.setState({ appVersion: response.data })


  }
  render() {
    return (
      <div class="ui green small header">
        App Version is {this.state.appVersion}
      </div>
    )
  }
}
