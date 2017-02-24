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
    this.handleEnterPress = this.handleEnterPress.bind(this)
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

  handleEnterPress (event) {
    if (event.keyCode === 13) {
      this.handleSubmit(event)
    }
  }

  render () {
    return (
      <div className='form-container'>
        <Form inline>
          <FormGroup controlId='searchInput' bsSize='large'>
            <FormControl
              type='text'
              value={this.state.searchText}
              placeholder='What are you looking for?'
              className='searchInput'
              onChange={this.handleSearchInputChange}
            />
          </FormGroup>
          <Button type='button' bsSize='large' onClick={this.handleSubmit}>
            Search
          </Button>
        </Form>
      </div>
    )
  }
}

SearchBar.propTypes = {
  onSearchSubmit: func
}

export default SearchBar
