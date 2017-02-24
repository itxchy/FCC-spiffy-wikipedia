let WikiContainer = React.createClass({
  getInitialState: () => { 
    return {
      data: [],
      searchQuery: 'test',
      newQuery: false
    } 
  },
  
  handleSearchSubmit: function (query) {
    this.setState({ searchQuery: query, newQuery: true });
  },
  
  loadWikiData: function() {
    let wikiSearchResults = this.props.WikiSearchURI + this.state.searchQuery + '&callback=?';    
    $.getJSON(wikiSearchResults , results => {
      this.setState({data: results, searchQuery: '', newQuery: false});
    });
  },

  componentDidUpdate: function() {
    if (this.state.newQuery === true) {
      this.loadWikiData();
    }
  },
  
  render: function() {
    return (
      <div>
        <SearchBar onSearchSubmit={this.handleSearchSubmit} />
        <SearchResults searchResults={this.state.data} />
      </div>
    );
  }
});

let SearchBar = React.createClass({
  getInitialState: function() {
    return {
      searchText: ''
    };
  },
  
  handleSearchTextChange: function(e) {
    this.setState({searchText: e.target.value});
  },
  
  handleEnterPress: function(e) {
    if ( e.keyCode === 13 ) {
      this.handleSubmit(e);
    }
    return;  
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
    let query = this.state.searchText.trim();
    if (!query) {
      return;
    }
    this.props.onSearchSubmit(query);
    this.setState({searchText: ''});
  },
  
  render: function() {
    return (
      <div className="container form-container row">
        <div className="col-lg-12">
          <div className="input-group">
            <input type="text" 
              className="form-control input-text" 
              placeholder="What are you looking for?" 
              onChange={this.handleSearchTextChange}
              onKeyDown={this.handleEnterPress}
            />
            <span className="input-group-btn">
              <button 
                className="btn btn-raised btn-primary" 
                type="button" 
                onClick={this.handleSubmit}
              >
                Search
              </button>
            </span>
          </div>
        </div>
        <a href="http://en.wikipedia.org/wiki/Special:Random">Take a chance!</a>
      </div>
    );
  }
});

let SearchResults = React.createClass({

  render: function() {
    let resultList = [];
    
    // If there are search results returned from Wikipedia's API, populate the 
    // Result components with data, and push them to the resultList array.
    // A for-loop is prefereable to .map here because a counter is needed to 
    // iterate through the nested arrays.
    if ((this.props.searchResults.length > 1) && this.props.searchResults[1][1]) {
      let results = this.props.searchResults;
      for (var i = 1; i < 10; i++) {
        var element = <Result headline={results[1][i]} description={results[2][i]} link={results[3][i]} />;
        resultList.push(element);
      }
    }
    
    // If no results are found, don't put any Result components in the 
    // result list array. Inform the user that nothing was found. Rats...
    if (this.props.searchResults.length > 1 && this.props.searchResults[1][1] === undefined) {
      var noResults = <h1 className="text-center">Nothing Found</h1>;
      resultList.push(noResults);
    }
    
    return (
      <section className="container results">
        {resultList}
      </section>
    );
  }
}); 

var Result = React.createClass({
  render: function() {
    return (
      <article className="result-cell">
        <a href={this.props.link}>
          <h2>{this.props.headline}</h2>
        </a>
        <p>{this.props.description}</p>
      </article>
    );
  }
});

React.render(
  <WikiContainer 
    WikiSearchURI="https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=" 
  />,
  document.getElementById('react')
);