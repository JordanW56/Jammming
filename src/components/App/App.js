import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();


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
    this.search = this.search.bind(this);
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      this.setState(previousState => ({
        playlistTracks: [...previousState.playlistTracks, track]
      }));
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  savePlaylist() {
    let trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      searchResults: []
    });
    this.updatePlaylistName('New Playlist');
    console.info(trackUris);
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
    .then(searchResults => this.setState({
      searchResults: searchResults
    }));
  }


  render() {
    return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch={this.search} />
      <div className="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
      <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onNameChange = {this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist} />

      
      </div>
    </div>
    </div>
    );
  }
}

export default App;