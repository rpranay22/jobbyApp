import Cookies from 'js-cookie'
import {Component} from 'react'
import DetailedDescription from '../DetailedDescription'
import SkillSet from '../SkillSet'
import Life from '../Life/index'
import Card from '../Card'
import Header from '../Header'
import FailureView from '../FailureView'
import Loaders from '../Loaders'
import './index.css'
const apiStatus = {
  failure: 'FAILED',
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
}
class JobItemDetails extends Component {
  state = {
    obj: {},
    isLoading: true,
    skills: [],
  }
  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    console.log('jwt', Cookies.get('jwt_token'))
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const obj = await response.json()
      const {job_details} = obj
      const {skills} = job_details

      this.setState({
        obj: obj,
        isLoading: false,
        skills,
        apistatus: apiStatus.success,
      })
    } else {
      this.setState({
        apistatus: apiStatus.failure,
        isLoading: false,
      })
    }
  }

  jobDetails = () => {
    const {obj, skills} = this.state
    const {job_details, similar_jobs} = obj
    return (
      <div>
        <DetailedDescription item={job_details} />
        <h1>Skills</h1>
        <ul>
          {skills.map(ele => (
            <SkillSet item={ele} key={ele.name} />
          ))}
        </ul>
        <div>
          <h1>Description</h1>
          <Life item={job_details} />
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul>
            {similar_jobs.map(ele => (
              <Card item={ele} key={ele.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderContent = apistatus => {
    switch (apistatus) {
      case apiStatus.failure:
        return <FailureView />
      case apiStatus.success:
        return this.jobDetails()
    }
  }

  render() {
    const {apistatus, isLoading} = this.state
    return (
      <div>
        <Header />
        {isLoading ? <Loaders /> : this.renderContent(apistatus)}
      </div>
    )
  }
  componentDidMount() {
    this.getDetails()
  }
}
export default JobItemDetails
