import React from 'react'
import { analyzeWithCustomAlgorithms, analyzeWithSpacy } from './api.ts'

class WriteOMeterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'Γράψτε εδώ το κείμενο προς ανάλυση.',
      method: 'spacy-lib',
      results: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAnalysisMethodChange = this.handleAnalysisMethodChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showResults = this.showResults.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleAnalysisMethodChange(event) {
    this.setState({ method: event.target.value })
  }

  showResults() {
    if (this.state.results)
      return (
        <div>
          <p>Προτάσεις: {this.state.results.sents.length}</p>
          <p>Λέξεις: {this.state.results.words.length}</p>
        </div>
      )
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      let response
      if (this.method === 'spacy-lib') {
        response = await analyzeWithSpacy(this.state.value)
      } else {
        response = await analyzeWithCustomAlgorithms(this.state.value)
      }
      const results = await response.json()
      this.setState({ results })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const hasResults = !!this.state.results
    return (
      <form className="wom-form" onSubmit={this.handleSubmit}>
        <section className="wom-form__controls">
          <label className="wom-form__text-area">
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <section className="wom-form__controls__method-options">
            <h3>Ανάλυση με</h3>
            <p>
              <label>
                τη βιβλιοθήκη SpaCy
                <input
                  type="radio"
                  value="spacy-lib"
                  checked={this.state.method === 'spacy-lib'}
                  onChange={this.handleAnalysisMethodChange}
                />
                <span className="wom-form__controls__method-options__radio"></span>
              </label>
            </p>
            <p>
              <label>
                τους αλγορίθμους γραμματικής
                <input
                  type="radio"
                  value="grammatical-algorithms"
                  checked={this.state.method === 'grammatical-algorithms'}
                  onChange={this.handleAnalysisMethodChange}
                />
                <span className="wom-form__controls__method-options__radio"></span>
              </label>
            </p>
          </section>
        </section>
        <input className="wom-form__input" type="submit" value="Aνάλυση" />
        {hasResults && this.showResults()}
      </form>
    )
  }
}
export default WriteOMeterForm
