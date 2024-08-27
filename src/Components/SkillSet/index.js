import './index.css'
const SkillSet = props => {
  const {item} = props
  const {image_url, name} = item

  return (
    <li className="skill">
      <img src={image_url} alt={name} />
      <p>{name}</p>
    </li>
  )
}
export default SkillSet
