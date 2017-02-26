import React, { Component} from 'react'
import './SearchResults.css'
import Result from '../Result/Result'
const { array, object } = React.PropTypes

class SearchResults extends Component {
  constructor (props) {
    super(props)

    this.state = {
      populatedResults: false,
      noResults: null,
    }
  }

  errorCheck () {
    if (this.props.error) {
      return true
    }
    return false
  }

  render () {
    let populatedResultComponents = []
    const noResultsMessage = <h2>Nothing Found</h2>
    const errorMessage = <h2>An error occured.</h2>
    let nothingFound = false

    if (!this.props.error && this.props.searchResults.length > 1 && this.props.searchResults[1].length === 0) {
      console.log('this.props.searchResults', this.props.searchResults)
      nothingFound = true
      populatedResultComponents = false
    } 

    if (this.props.searchResults && this.props.searchResults[1]) {
      populatedResultComponents = this.props.searchResults[1].map((result, i) => {
        let element = (
          <Result
            headline={this.props.searchResults[1][i]}
            description={this.props.searchResults[2][i]}
            link={this.props.searchResults[3][i]}
            key={i}
          />
        )
        return element
      })
    }

    return (
      <section className='results'>
        {populatedResultComponents ? populatedResultComponents : null}
        {nothingFound ? noResultsMessage : null}
        {this.props.error ? errorMessage : null}
      </section>
    )
  }
}

SearchResults.propTypes = {
  searchResults: array,
  error: object
}

export default SearchResults
