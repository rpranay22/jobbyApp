import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

class Profile extends Component {
  state = {
    profile_details: {},
    isDisplayed: false,
    isLoading: true,
  }
  getCred = async () => {
    const url1 = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }

    try {
      const response1 = await fetch(url1, options)
      const data1 = await response1.json()
      console.log(data1)
      const {profile_details} = data1
      this.setState({
        profile_details,
        isLoading: false,
      })
    } catch (error) {
      this.setState({
        isLoading: false,
        isDisplayed: true,
      })
    }
  }

  render() {
    const {profile_details, isDisplayed, isLoading} = this.state
    const {name, profile_image_url, short_bio} = profile_details
    return isLoading ? (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    ) : isDisplayed ? (
      <div>
        <button>Retry</button>
      </div>
    ) : (
      <div className="profile">
        <img className="pr-image" src={profile_image_url} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{short_bio}</p>
      </div>
    )
  }
  componentDidMount() {
    this.getCred()
  }
}
export default Profile
