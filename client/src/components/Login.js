import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    // console.log('clicked Login')
    //1. use Axios to do a post request
    axios.post('http://localhost:5000/api/login', this.state.credentials)
      .then(res => {
        //2. if successful, console.log token
        // console.log('AB: login.js: login.post: res', res)
        localStorage.setItem('token', res.data.payload)
        // console.log('AB: login.js:login.post: props', this.props)
        this.props.history.push('/protected')
      })
      //3. if unsuccessful, show error
      .catch(err => {
        console.log('AB:login.js: login.get: err.message', err.message)
      })
  };

  render() {
    // console.log("AB: Login.js: credentials", this.state.credentials)
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;