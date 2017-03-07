import React from 'react'
import './SearchResults.css'
import Result from '../Result/Result'
const { array, object } = React.PropTypes

function SearchResults (props) {
  let populatedResultComponents = []
  let nothingFound = false
  let searchResultsMissing = false
  const noResultsMessage = <h2>Nothing Found</h2>
  const errorMessage = <h2>An error occured.</h2>

  // If no results are found, render noResultsMessage
  if (!props.error && props.searchResults && props.searchResults.length > 1 && props.searchResults[1].length === 0) {
    nothingFound = true
    populatedResultComponents = false
  }

  if (props.searchResults && props.searchResults[1]) {
    const headlines = props.searchResults[1]
    const descriptions = props.searchResults[2]
    const links = props.searchResults[3]
    populatedResultComponents = headlines.map((result, i) => {
      let element = (
        <Result
          headline={headlines[i]}
          description={descriptions[i]}
          link={links[i]}
          key={i}
        />
      )
      return element
    })
  }

  if (!props.searchResults) {
    searchResultsMissing = true
  }

  return (
    <section className='results'>
      {populatedResultComponents}
      {nothingFound ? noResultsMessage : null}
      {props.error | searchResultsMissing ? errorMessage : null}
    </section>
  )
}

SearchResults.propTypes = {
  searchResults: array.isRequired,
  error: object
}

export default SearchResults
