import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      searchResults: []
    };
    this.ready = true;
    this.getReady = this.getReady.bind(this);
  }

  handleChange(attrName) {
    return (e) => {
      e.preventDefault();
      this.setState({ [attrName]: e.target.value });
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.ready) {
      this.ready = false;
      this.updateSearchResults();
      window.setTimeout(this.getReady, 200);
    }
  }

  getReady() {
    this.ready = true;
  }

  updateSearchResults() {
    const searchResults = [];
    const { searchString } = this.state;
    const searchStr = searchString.toLowerCase();
    const { users, songs } = this.props;


    for (let i = 0; i < users.length; i++) {
      const username = users[i].username.toLowerCase();


      if (searchString.length > 0 && username.startsWith(searchStr)) {
        searchResults.push(users[i]);
      }
      if (searchResults.length > 3) { break; }
    }

    for (let i = 0; i < songs.length; i++) {
      const title = songs[i].title.toLowerCase();

      if (searchString.length > 0 && title.startsWith(searchStr)) {
        searchResults.push(songs[i]);
      }
      if (searchResults.length > 8) { break; }
    }

    this.setState({ searchResults });
  }

  render() {
    return (
      <section className="nav-middle">
        <form className="nav-search">
          <input onChange={this.handleChange('searchString')} value={this.state.searchString} type="search" placeholder="Search"></input>
          <button type="submit">Search</button>
        </form>

        <ul>
          {
            this.state.searchResults.map((result, idx) => {
              let text;
              if (result.username) {
                text = result.username;
              } else {
                text = result.title;
              }
              return <li key={idx}>{text}</li>;
            })
          }
        </ul>
      </section>
    );
  }
}

export default SearchForm;