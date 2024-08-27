import Header from '../Header'
import Cookies from 'js-cookie'
import {Component} from 'react'
import FilterSalary from '../FilterSalary'
import FilterJobs from '../FilterJobs'
import JobPoster from '../JobPoster'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Loaders from '../Loaders'
import Profile from '../Profile'
import FailureView from '../FailureView'
import './index.css'

const apiStatus = {
  failure: 'FAILED',
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
}
class Jobs extends Component {
  state = {
    jobs: [],
    value: '',
    jobTypes: [],
    apistatus: apiStatus.initial,
    isLoading: true,
    salRange: '',
  }
  fetchJobsData = async () => {
    this.setState({
      apistatus: apiStatus.inprogress,
    })
    const url2 = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }

    const response2 = await fetch(url2, options)
    console.log('response', response2)
    if (response2.ok === true) {
      const data2 = await response2.json()
      const {jobs} = data2
      console.log(jobs)
      this.setState({
        jobs,
        apistatus: apiStatus.success,
        isLoading: false,
      })
    } else {
      this.setState({
        apistatus: apiStatus.failure,
        isLoading: false,
      })
    }
  }

  filRes = val => {
    this.setState(
      {
        jobTypes: val,
      },
      this.finalFilter,
    )
  }

  getSearch = e => {
    this.setState({
      value: e.target.value,
    })
  }

  filSalaryRange = val => {
    this.setState(
      {
        salRange: val,
      },
      this.finalFilter,
    )
  }

  joiningJobTypes = types => {
    let str = ''

    for (let i = 0; i < types.length; i++) {
      switch (types[i]) {
        case 'Full Time':
          str += 'FULLTIME' + ','
          break
        case 'Part Time':
          str += 'PARTTIME' + ','
          break
        case 'Freelance':
          str += 'FREELANCE' + ','
          break
        case 'Internship':
          str += 'INTERNSHIP' + ','
          break
      }
    }

    return str.slice(0, str.length - 1)
  }
  finalFilter = async () => {
    const {jobTypes, salRange, value} = this.state
    const allJobs = this.joiningJobTypes(jobTypes)
    const url = `https://apis.ccbp.in/jobs?employment_type=${allJobs}&minimum_package=${salRange}&search=${value}`
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      this.setState({
        jobs,
        apistatus: apiStatus.success,
        isLoading: false,
      })
    } else {
      this.setState({
        apistatus: apiStatus.failure,
        isLoading: false,
      })
    }
  }

  filt = () => {
    this.finalFilter()
  }

  renderFailureView = () => {
    return <FailureView />
  }

  renderNoJobsView = () => {
    return (
      <div>
        <h1>No Jobs Found</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />

        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }
  displayJobs = () => {
    const {jobs} = this.state
    return (
      <div>
        {jobs.map(ele => (
          <Link to={`jobs/${ele.id}`}>
            <JobPoster item={ele} />
          </Link>
        ))}
      </div>
    )
  }

  successView = () => {
    const {jobs} = this.state

    if (jobs.length > 0) {
      return this.displayJobs()
    } else {
      return this.renderNoJobsView()
    }
  }

  finalResult = apistatus => {
    switch (apistatus) {
      case apiStatus.success:
        return this.successView()
        break
      case apiStatus.failure:
        return this.renderFailureView()
        break
    }
  }
  render() {
    const {salaryRangesList, employmentTypesList} = this.props
    const {jobs, value, apistatus, isLoading} = this.state

    return (
      <div>
        <Header />
        <div className="jobs">
          <div className="profile-filters">
            <Profile />
            <hr />
            <h1 className="tem">Type of Employment</h1>
            <div className="employment-filter">
              <ul>
                {employmentTypesList.map(ele => (
                  <FilterJobs
                    key={ele.employmentTypeId}
                    item={ele}
                    filRes={this.filRes}
                  />
                ))}
              </ul>
            </div>

            <hr />
            <h1 className="tem">Salary Range</h1>
            <div className="salaryFilter">
              <ul>
                {salaryRangesList.map(ele => (
                  <FilterSalary
                    key={ele.salaryRangeId}
                    item={ele}
                    filSalaryRange={this.filSalaryRange}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="displayJobs">
            <div>
              <input type="search" onChange={this.getSearch} value={value} />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.filt}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {isLoading ? <Loaders /> : this.finalResult(apistatus)}
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.fetchJobsData()
  }
}
export default Jobs
