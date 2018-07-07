import React from "react";
import PropTypes from "prop-types";
class SearchPage extends React.Component {
  client = algoliasearch("G7ECYSW3BR", this.props.api_key);
  index = this.client.initIndex("movies");

  state = { searchResults: "" };

  performSearch = event => {
    event.preventDefault();
    const query = event.target.value;

    this.index
      .search(query, { hitsPerPage: 10, page: 0 })
      .then(content => {
        console.log(content);
        this.updateSearchResults(content);
      })
      .catch(err => {
        console.error(err);
      });
  };

  updateSearchResults = searchResults => {
    this.setState({ searchResults });
  };

  render() {
    const searchResults = this.state.searchResults
      ? this.state.searchResults.hits
      : null;
    return (
      <React.Fragment>
        <div className="searchpage-container">
          <h1>Movie Search</h1>
          <form>
            <input
              className="searchpage-searchbar"
              type="text"
              onChange={this.performSearch}
            />
          </form>
          <div>
            {searchResults &&
              searchResults.map(result => {
                return (
                  <div className="result-containter">
                    <img src={result.image} />
                    <div className="result-text-container">
                      <div className="result-title">{result.title}</div>
                      <div>{result.year}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchPage;
