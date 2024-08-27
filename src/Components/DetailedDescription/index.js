import {FaStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {IoBagSharp} from 'react-icons/io5'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import {Component} from 'react'
class DetailedDescription extends Component {
  render() {
    const {item} = this.props

    const {
      company_logo_url,
      employment_type,
      job_description,
      location,
      package_per_annum,
      rating,
      title,
      company_website_url,
    } = item

    return (
      <div className="jb">
        <div className="title">
          <img
            className="icon"
            src={company_logo_url}
            alt="job details company logo"
          />
          <div>
            <h1>{title}</h1>
            <div className="arrange">
              <FaStar />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="arrange">
            <div className="location arrange">
              <IoLocationOutline />
              <p>{location}</p>
            </div>
            <div className="empType arrange">
              <IoBagSharp />
              <p>{employment_type}</p>
            </div>
          </div>
          <p>{package_per_annum}</p>
        </div>
        <hr />
        <div>
          <div>
            <h1>Description</h1>

            <a href={company_website_url}>
              Visit <BsBoxArrowUpRight />
            </a>
          </div>
          <p>{job_description}</p>
        </div>
      </div>
    )
  }
}
export default DetailedDescription
