import React from 'react'
import axios from 'axios'

const token = localStorage.getItem('jwt')

axios.defaults.baseURL = 'http://localhost:4000/api'

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const notLoggedIn = <div>Please login to see our jokes</div>

      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>
    }
  }
}
