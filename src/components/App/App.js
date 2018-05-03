import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      searchResults: [
        {
          name: "name",
          artist: "artist",
          album: "album",
          id: "id"
        }
      ]
    }
    
  }
  render() {
    return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar searchResults={this.state.searchResults} />
      /* Add a SearchBar component */
      <div className="App-playlist">
        /* Add a SearchResults component */
        /* Add a Playlist component */
      </div>
    </div>
    </div>
    );
  }
}

export default App;