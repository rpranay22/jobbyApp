import {Component} from 'react'
import './index.css'
import {Redirect, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    areCorrect: false,
    error_msg: '',
  }

  checkCredentials = async e => {
    e.preventDefault()

    const {history} = this.props
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const obj = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(obj),
    }
    const response = await fetch(url, options)

    const data = await response.json()
    console.log('data', data)
    if (data.jwt_token === undefined) {
      this.setState({
        areCorrect: true,
        error_msg: data.error_msg,
      })
    } else {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1})
      history.replace('/')
    }
  }

  saveUname = e => {
    this.setState({
      username: e.target.value,
    })
  }

  savePass = e => {
    this.setState({
      password: e.target.value,
    })
  }

  render() {
    const {username, password, error_msg, areCorrect} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form">
        <form onSubmit={this.checkCredentials}>
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="uname">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              onChange={this.saveUname}
              value={username}
            />
          </div>
          <div className="uname">
            <label htmlFor="pass">PASSWORD</label>
            <input
              id="pass"
              type="password"
              placeholder="Password"
              onChange={this.savePass}
              value={password}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {areCorrect && <p>{error_msg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
