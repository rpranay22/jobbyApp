import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
const Header = props => {
  const {history} = props

  const logOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="elements">
      <Link to="/">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <div>
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
      </div>
      <button className="logout-btn" onClick={logOut}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
