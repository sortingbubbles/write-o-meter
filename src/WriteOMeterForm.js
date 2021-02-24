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
    if (this.state.results) return (
      <div>
        <p>
          Προτάσεις: {this.state.results.sents.length}
        </p>
        <p>
          Λέξεις: {this.state.results.words.length}
        </p>
      </div>
    )
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await analyze(this.state.value)
      const results = await response.json()
      this.setState({ results })
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
