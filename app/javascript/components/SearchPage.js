import React from "react";
import PropTypes from "prop-types";
class SearchPage extends React.Component {
  client = algoliasearch("G7ECYSW3BR", this.props.api_key);
  index = this.client.initIndex("movies");

  state = { searchQuery: "", searchResults: "", filteredYears: [] };

  performSearch = (query, years) => {
    const searchQuery = query || this.state.searchQuery;
    const filteredYears = years || this.state.filteredYears;

    const filters = filteredYears.map(year => {
      return `year:${year}`;
    });

    this.index
      .search(searchQuery, {
        hitsPerPage: 10,
        page: 0,
        facets: ["year"],
        facetFilters: filters
      })
      .then(searchResults => {
        console.log(searchResults);
        this.updateSearchResults(searchResults);
      })
      .catch(err => {
        console.error(err);
      });
  };

  updateSearchQuery = event => {
    event.preventDefault();
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
    this.performSearch(searchQuery, null);
  };

  updateSearchResults = searchResults => {
    this.setState({ searchResults });
  };

  toggleYear = year => {
    const filteredYears = this.state.filteredYears;
    const yearIndex = filteredYears.indexOf(year);
    let years;
    if (yearIndex > -1) {
      filteredYears.splice(yearIndex, 1);
    } else {
      filteredYears.push(year);
    }

    console.log({ filteredYears });
    this.setState({ filteredYears });
    this.performSearch(null, filteredYears);
  };

  render() {
    const searchResults = this.state.searchResults
      ? this.state.searchResults
      : null;
    const hits = searchResults ? searchResults.hits : null;
    const facets = searchResults ? searchResults.facets : null;
    return (
      <React.Fragment>
        <div className="searchpage-container">
          <h1>Movie Search</h1>
          <form>
            <input
              className="searchpage-searchbar"
              type="text"
              onChange={this.updateSearchQuery}
            />
          </form>

          {searchResults &&
            searchResults.hits.length > 0 && (
              <div className="searchresults-container">
                <div className="year-facets-container">
                  <h3>Year</h3>
                  {Object.keys(facets.year)
                    .reverse()
                    .map(y => {
                      return (
                        <div>
                          <label for="year">{`${y} (${facets.year[y]})`}</label>
                          <input
                            onClick={() => this.toggleYear(y)}
                            value="year"
                            type="checkbox"
                          />
                        </div>

                        // <div onClick={() => this.toggleYear(y)}>{`${y} (${
                        //   facets.year[y]
                        // })`}</div>
                      );
                    })}
                </div>
                <div>
                  {hits.map(result => {
                    return (
                      <div className="result-containter">
                        <img src={result.image} />
                        <div className="result-text-container">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: result._highlightResult.title.value
                            }}
                            className="result-title"
                          />
                          <div>{result.year}</div>
                          <div>{result.actors.join(", ")}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default SearchPage;
