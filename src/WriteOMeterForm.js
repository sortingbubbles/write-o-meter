import React from 'react'
import { analyze } from './api.ts'

class WriteOMeterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'Γράψτε εδώ το κείμενο προς ανάλυση.',
      results: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showResults = this.showResults.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  showResults() {
    if (this.state.results) return <p>Αποτελέσματα: {this.state.results}</p>
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await analyze(this.state.value)
      const data = await response.json()
      this.setState({ results: data })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const hasResults = !!this.state.results
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea value={this.state.value} onChange={this.handleChange} />{' '}
        </label>
        <input type="submit" value="Aνάλυση" />
        {hasResults && this.showResults()}
      </form>
    )
  }
}
export default WriteOMeterForm
