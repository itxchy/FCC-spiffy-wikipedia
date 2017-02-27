import React, { Component } from 'react'
import './SearchBar.css'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
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
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup controlId='searchInput' bsSize='large'>
            <FormControl
              type='text'
              value={this.state.searchText}
              placeholder='What are you looking for?'
              className='search-input'
              onChange={this.handleSearchInputChange}
            />
          </FormGroup>
          <Button type='submit' bsSize='large' onClick={this.handleSubmit} id='search-submit'>
            Search
          </Button>
        </Form>
        <a className='chance-link' href='https://en.wikipedia.org/wiki/Special:Random'>Take a chance!</a>
      </div>
    )
  }
}

SearchBar.propTypes = {
  onSearchSubmit: func.isRequired
}

export default SearchBar
