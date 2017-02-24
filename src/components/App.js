import React, { Component } from 'react'
import './App.css'
import SearchBar from './SearchBar/SearchBar'
import Header from './Header/Header'
import SearchResults from './SearchResults/SearchResults'
import { wikipediaUri } from '../config.js'
import fetchJsonp from 'fetch-jsonp'

class App extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      data: [],
      searchQuery: '',
      newQuery: false,
      error: null
    }

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.loadWikiData = this.loadWikiData.bind(this)
  }

  handleSearchSubmit (query) {
    this.setState({ searchQuery: query, newQuery: true })
  }

  loadWikiData () {
    const wikipediaSearchUri = `${wikipediaUri}${this.state.searchQuery}&callback=?`

    fetchJsonp(wikipediaSearchUri)
      .then(res => {
        // http://stackoverflow.com/questions/38732639/accessing-object-in-returned-promise-using-fetch-w-react-js
        // weird 
        if (res.ok) {
          const results = res.json()
          console.log('results', res)
          this.setState({ data: results, searchQuery: '', newQuery: false })
        } else {
          this.setState({ error: { status: res.status}, searchQuery: '', newQuery: false })
        }
      })
      .catch(error => {
        this.setState({ error: { fetch: 'Request failed', error: error }, newQuery: false})

      })
  }

  componentDidUpdate () {
    if (this.state.newQuery) {
      this.loadWikiData()
    }
  }

  render () {
    return (
      <div className='App'>
        <Header />
        <SearchBar onSearchSubmit={this.handleSearchSubmit} />
        <SearchResults searchResults={this.state.data} error={this.state.error} />
      </div>
    )
  }
}

export default App
