import React from 'react'
import './SearchBar.css'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
const { func, string } = React.PropTypes

function SearchForm (props) {
  return (
    <Form inline onSubmit={props.handleSubmit}>
      <FormGroup controlId='searchInput' bsSize='large'>
        <FormControl
          type='text'
          value={props.searchText}
          placeholder='What are you looking for?'
          className='search-input'
          onChange={props.handleSearchInputChange}
        />
      </FormGroup>
      <Button type='submit' bsSize='large' onClick={props.handleSubmit} id='search-submit'>
        Search
      </Button>
    </Form>
  )
}

SearchForm.propTypes = {
  handleSubmit: func,
  searchText: string,
  handleSearchInputChange: func
}

export default SearchForm
