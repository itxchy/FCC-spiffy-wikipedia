import React from 'react'
import './SearchResults.css'
import Result from '../Result/Result'
const { array, object } = React.PropTypes

function SearchResults (props) {
  let resultList = []
  let error = null
  let noResults = null

  if (props.error) {
    error = <h1>An error occured.</h1>
  }

  if (props.searchResults.length > 1 && !props.searchResults[1][1]) {
    noResults = <h1>Nothing Found</h1>
  } else {
    props.searchResults.map((result, i) => {
      let element = (
        <Result
          headline={props.searchResults[1][i]}
          description={props.searchResults[2][i]}
          link={props.searchResults[3][i]}
        />
      )
      return resultList.push(element)
    })
  }

  return (
    <section className='results'>
      {resultList ? resultList : noResults}
      {error}
    </section>
  )
}

SearchResults.propTypes = {
  searchResults: array,
  error: object
}

export default SearchResults
