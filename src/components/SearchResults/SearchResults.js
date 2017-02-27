import React from 'react'
import './SearchResults.css'
import Result from '../Result/Result'
const { array, object } = React.PropTypes

function SearchResults (props) {
  let populatedResultComponents = []
  const noResultsMessage = <h2>Nothing Found</h2>
  const errorMessage = <h2>An error occured.</h2>
  let nothingFound = false

  if (!props.error && props.searchResults.length > 1 && props.searchResults[1].length === 0) {
    nothingFound = true
    populatedResultComponents = false
  }

  if (props.searchResults && props.searchResults[1]) {
    populatedResultComponents = props.searchResults[1].map((result, i) => {
      let element = (
        <Result
          headline={props.searchResults[1][i]}
          description={props.searchResults[2][i]}
          link={props.searchResults[3][i]}
          key={i}
        />
      )
      return element
    })
  }

  return (
    <section className='results'>
      {populatedResultComponents}
      {nothingFound ? noResultsMessage : null}
      {props.error ? errorMessage : null}
    </section>
  )
}

SearchResults.propTypes = {
  searchResults: array,
  error: object
}

export default SearchResults
