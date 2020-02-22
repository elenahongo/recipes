
let accessToken;
const clientID = 'f0fc434f30204a42864ea3ce3d3699c4';
const redirectURI = "http://sassy-back.surge.sh/";

const Spotify = {
  getAccessToken () {
    
    if(accessToken){
      return accessToken}
    
      let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      let expirationTokenMatch = window.location.href.match(/expires_in=([^&]*)/);
      if(accessTokenMatch && expirationTokenMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expirationTokenMatch[1]);
        
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        
        return accessToken;
      
      } else {
        console.log('no encuentra el token')
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        window.location = accessUrl;
      }
    
  },
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },
  savePlaylist(name, uris) {
    if(!name && uris) {
      return
    }
    let accessToken = Spotify.getAccessToken();
    let headers= {Authorization: `Bearer ${accessToken}`} 
    let userId; 
        fetch('https://api.spotify.com/v1/me', {'headers': headers}).then(response => {
           
                return response.json();
           
        }).then((resolvedObject) => {
            userId = resolvedObject.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
                {   method: 'POST',
                    'headers': headers,
                    body: JSON.stringify({'name': name})
                }
             ).then(responseTwo => {
                return responseTwo.json();
             }).then ((resolvedObjectTwo) => {
                 let playlistId =  resolvedObjectTwo.id
                 return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: {Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                        },
                 body: JSON.stringify({"uris": uris})
                })
             })
        })
  }
};
export default Spotify;