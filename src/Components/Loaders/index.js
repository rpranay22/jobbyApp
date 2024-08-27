import Loader from 'react-loader-spinner'
const Loaders = () => {
  return (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
}
export default Loaders
