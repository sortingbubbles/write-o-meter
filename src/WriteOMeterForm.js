import React from 'react'
import { analyze } from './api.ts'

class WriteOMeterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'Γράψτε εδώ το κείμενο προς ανάλυση.',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showResults = this.showResults.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  showResults(results) {
    if (results) {
      return <p>Αποτελέσματα: {results}</p>
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await analyze(this.state.value)
      console.log(response)
      this.showResults(response)
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea value={this.state.value} onChange={this.handleChange} />{' '}
        </label>
        <input type="submit" value="Aνάλυση" />
      </form>
    )
  }
}
export default WriteOMeterForm
