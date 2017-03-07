import React, { Component } from 'react'
import './App.css'
import SearchBar from './SearchBar/SearchBar'
import Header from './Header/Header'
import SearchResults from './SearchResults/SearchResults'
import { wikipediaUri } from '../config.js'
import { fetchWikipediaResults } from './App.lib.js'

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
    if (this.state.searchQuery === '') { return }
    const wikipediaSearchUri = `${wikipediaUri}${this.state.searchQuery}`
    fetchWikipediaResults(wikipediaSearchUri)
      .then(parsedResults => {
        return this.setState({ data: parsedResults, searchQuery: '', newQuery: false })
      })
      .catch(error => {
        return this.setState({ error: { fetch: 'Request failed', error: error }, newQuery: false })
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
