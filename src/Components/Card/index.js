import {FaStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {IoBagSharp} from 'react-icons/io5'
const Card = props => {
  const {item} = props
  const {
    company_logo_url,
    employment_type,
    job_description,
    location,

    rating,
    title,
  } = item

  return (
    <li className="jb">
      <div className="title">
        <img
          className="icon"
          src={company_logo_url}
          alt="similar job company logo"
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
      </div>
      <hr />
      <div>
        <h1>Description</h1>
        <p>{job_description}</p>
      </div>
    </li>
  )
}
export default Card
