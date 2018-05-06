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
      ],
      playlistTracks: [
        {
          name: "name",
          artist: "artist",
          album: "album",
          id: "id"
        }
      ],
      playlistName: "test"
    }
    this.addTrack = this.addTrack.bind(this);  
    this.removeTrack = this.removeTrack.bind(this);  
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.state.playlistTracks.push(track);
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  render() {
    return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar searchResults={this.state.searchResults}  />
      /* Add a SearchBar component */
      <div className="App-playlist">
        /* Add a SearchResults component */
        <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} />
      </div>
    </div>
    </div>
    );
  }
}

export default App;