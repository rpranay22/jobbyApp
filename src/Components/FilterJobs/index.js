import {Component} from 'react'
let filteredValues = []
class FilterJobs extends Component {
  getFilter = e => {
    const {filRes} = this.props

    if (e.target.checked) {
      filteredValues.push(e.target.value)
    } else {
      let index = filteredValues.indexOf(e.target.value)
      filteredValues.splice(index, 1)
    }
    filRes(filteredValues)
  }

  render() {
    const {item} = this.props
    const {label} = item
    return (
      <li className="filterOption">
        <input
          className="inp-check"
          type="checkbox"
          value={label}
          onClick={this.getFilter}
        />
        <p className="type-name">{label}</p>
      </li>
    )
  }
}
export default FilterJobs
