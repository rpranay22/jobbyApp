const Life = props => {
  const {item} = props
  const {life_at_company} = item
  const {description, image_url} = life_at_company
  return (
    <div>
      <p>{description}</p>
      <img src={image_url} alt={name} />
    </div>
  )
}
export default Life
