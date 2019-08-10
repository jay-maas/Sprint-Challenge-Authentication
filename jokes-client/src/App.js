import React from 'react'
import { NavLink, Route, withRouter } from 'react-router-dom'

import Login from './components/Login'
import Jokes from './components/Jokes'
import Register from './components/Register'

class App extends React.Component {
  logout = () => {
    localStorage.removeItem('jwt')

    this.props.history.push('/login')
  }
  render() {
    return (
      <div style={{textAlign: 'center'}}>
      
        <div style={{height: '10vh', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2em'}}>
          <NavLink to="/jokes">Jokes</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <button style={{background: 'none'}} onClick={this.logout}>Logout</button>
        </div>
        
        <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', padding: '2.5%', width: '100%'}}>
          <Route path="/jokes" component={Jokes} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>

      </div>
    )
  }
}

export default withRouter(App)
