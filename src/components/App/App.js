import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: "New Playlist"
    }
    this.addTrack = this.addTrack.bind(this);  
    this.removeTrack = this.removeTrack.bind(this); 
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.search.bind(this);
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: this.state.name
    });
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

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  searchSpotify(searchTerm) {
    return Spotify.search(term)
    .then(track => this.setState( { searchResults: tracks } ));
  }


  render() {
    return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar searchSpotify={this.searchSpotify} onChange={this.handleTermChange} />
      <div className="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
      <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onNameChange = {this.state.updatePlaylistName}/>
      </div>
    </div>
    </div>
    );
  }
}

export default App;