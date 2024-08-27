import {Component} from 'react'
let filteredValues = []
class FilterSalary extends Component {
  getFilter = e => {
    const {filSalaryRange} = this.props
    let val = e.target.value.slice(0, 1) + '000000'
    filSalaryRange(parseInt(val))
  }

  render() {
    const {item} = this.props
    const {label} = item
    return (
      <li className="filterOption">
        <input
          name="salar"
          className="inp-check"
          type="radio"
          value={label}
          onClick={this.getFilter}
        />
        <p className="type-name">{label}</p>
      </li>
    )
  }
}
export default FilterSalary
