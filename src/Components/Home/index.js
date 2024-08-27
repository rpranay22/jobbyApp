import './index.css'
import Header from '../Header/index'
import {Link} from 'react-router-dom'
const Home = props => {
  const jobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <div className="home-page-container">
      <Header />
      <div>
        <h1>Find the job that fits your life</h1>
        <p>Millions of people are searching for jobs</p>
        <button onClick={jobs}>Find Jobs</button>
      </div>
    </div>
  )
}
export default Home
