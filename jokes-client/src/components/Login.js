import React from 'react'
import axios from 'axios'

export default class Login extends React.Component {
  state = {
    username: 'J',
    password: 'testing',
  }

  handleInputChange = event => {
    const { id, value } = event.target

    this.setState({ [id]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const endpoint = 'http://localhost:4000/api/login'
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log('RESPONSE', res.data)
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/jokes')
      })
      .catch(error => {
        console.error('ERROR', error)
      })
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', padding: '2.5%', width: '50%'}}>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', padding: '2.5%'}}>
            <label htmlFor="username">Username</label>
            <input
              style={{margin: '2.5vh', height: '5vh', textAlign: 'center', border: 'none',outline: 'none'}}
              id="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', padding: '2.5%'}}>
            <label htmlFor="password">Password</label>
            <input
              style={{margin: '2.5vh', height: '5vh', textAlign: 'center', border: 'none', outline: 'none'}}
              id="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  }
}
