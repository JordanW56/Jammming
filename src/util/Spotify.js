const clientId = '73299c5fb897476d96f951291ad85bdc'; 
const redirectUri = 'http://jw-jammming.surge.sh/'; 
const accessUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
          return accessToken;
        }

        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenMatch && expiresMatch) {
            accessToken = tokenMatch[1];
            const expires = Number(expiresMatch[1]);
            window.setTimeout(() => accessToken = '', expires * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
          } else {
            window.location = accessUrl;
          }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          if (!jsonResponse.tracks) {
            return [];
          }
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        });
      },
    
  savePlaylist(name, trackUris) {
    if (!name || !trackUris || trackUris.length === 0) return;
    const userUrl = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId;
    let playId;
    fetch(userUrl, {
      headers: headers 
    })
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)
    .then(() => {
      const playlistURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
      fetch(playlistURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: name
          })
        })
        .then(response => response.json())
        .then(jsonResponse => playId = jsonResponse.id)
        .then(() => {
          const addPlaylist = `https://api.spotify.com/v1/users/${userId}/playlists/${playId}/tracks`;
          fetch(addPlaylist, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              uris: trackUris
            })
          });
        })
    })
  }
}; 


export default Spotify;
