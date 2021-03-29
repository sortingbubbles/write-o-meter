import React from 'react'
import { analyzeWithCustomAlgorithms, analyzeWithSpacy } from './api.ts'


const partsOfSpeech = {
  ADJ: 'επίθετο',
  ADP: 'πρόθεση',
  ADV: 'επίρρημα',
  AUX: 'βοηθητικό ρήμα',
  CONJ: 'σύνδεσμος',
  DET: 'άρθρο',
  INTJ: 'επιφώνημα',
  NOUN: 'ουσιαστικό',
  NUM: 'αριθμός',
  PART: 'σωματίδιο',
  PRON: 'αντωνυμία',
  PROPN: 'κύριο όνομα',
  PUNCT: 'στίξη',
  SCONJ: 'δευτερεύουσα σύνδεση',
  SYM: 'σύμβολο',
  VERB: 'ρήμα',
  X: 'άλλο',
}

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
    this.getClassByPartOfSpeech = this.getClassByPartOfSpeech.bind(this)
    this.showResults = this.showResults.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleAnalysisMethodChange(event) {
    this.setState({ method: event.target.value })
  }

  getClassByPartOfSpeech(pos) {
    return `wom-text__${pos.toLowerCase()}`
  }

  showStatisticResults() {
    if (this.state.results) {
      return (
        <section className="wom-form__controls__method-options">
          <h3>Μερικά Αποτελέσματα</h3>
          <p>Προτάσεις: {this.state.results.sents.length}</p>
          <p>Λέξεις: {this.state.results.words.length}</p>
        </section>
      )
    }
  }
  showResults() {
    if (this.state.results && this.state.results.tokens) {
      return (
        <p class="text-results">
            {this.state.results.tokens.map((token, index) => {
              const classForToken = this.getClassByPartOfSpeech(token.pos)
              return (
                <span key={token.start}>
                  <span className={`wom-text ${classForToken}`}>
                    {this.state.results.texts[index]}
                    <sub> { partsOfSpeech[token.pos] }</sub>
                  </span>{' '}
                </span>
              )
            })}
        </p>
      )
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      let response
      if (this.state.method === 'spacy-lib') {
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
          <section>
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
            {hasResults && this.showStatisticResults()}
          </section>
        </section>
        <input className="wom-form__input" type="submit" value="Aνάλυση" />
        {hasResults && this.showResults()}
      </form>
    )
  }
}
export default WriteOMeterForm
