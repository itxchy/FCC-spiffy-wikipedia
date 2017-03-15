import React, { Component } from 'react'
import './SearchBar.css'
import SearchForm from './SearchForm'
const { func } = React.PropTypes

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: ''
    }
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSearchInputChange (event) {
    this.setState({ searchText: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.state.searchText) {
      return
    }
    this.props.onSearchSubmit(this.state.searchText.trim())
    this.setState({ searchText: '' })
  }

  render () {
    return (
      <div className='form-container'>
        <SearchForm
          handleSubmit={this.handleSubmit}
          searchText={this.state.searchText}
          handleSearchInputChange={this.handleSearchInputChange} />
        <a className='chance-link' href='https://en.wikipedia.org/wiki/Special:Random'>
          Take a chance!
        </a>
      </div>
    )
  }
}

SearchBar.propTypes = {
  onSearchSubmit: func.isRequired
}

export default SearchBar
