import React from 'react'
import axios from 'axios'

import '../auth/addInterceptors'
import requiresAuth from '../auth/requiresAuth'

class Jokes extends React.Component {
  state = {
    jokes: [],
  }

  componentDidMount() {
    const endpoint = '/jokes'

    axios
      .get(endpoint)
      .then(res => {
        console.log('jokes', res.data)
        this.setState(() => ({ jokes: res.data }))
      })
      .catch(({ response }) => {
        console.error('jokes error', response)
      })
  }

  render() {
    return (
      <>
        <h2>Our Jokes</h2>

        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>{joke.joke}</li>
          ))}
        </ul>
      </>
    )
  }
}

export default requiresAuth(Jokes)
