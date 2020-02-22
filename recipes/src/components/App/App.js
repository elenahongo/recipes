import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
Menu from '../Menu/Menu';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
  this.state = {
  searchResults: [{name: 'name1', id: 1, course: 'course1', difficult: 1, description: 'brief description'}, {name: 'name2', id: 2, course: 'course2', difficult: 2, description: 'good description'}], 
  menuName: 'Favoritos',  
  menuRecipes: [{name: 'name4', id: 4, course: 'course1', difficult: 4, description: 'good enough description'}, {name: 'name5', id: 5, course: 'course2', difficult: 5, description: 'short description'}, {name: 'name3', id: 3, course: 'course2', difficult: 3, description: 'the best description'}]
};

this.addRecipe=this.addRecipe.bind(this);
this.removeTrack=this.removeTrack.bind(this);
this.updatePlaylistName=this.updatePlaylistName.bind(this);
this.savePlaylist=this.savePlaylist.bind(this);
this.search=this.search.bind(this);
}

addRecipe (recipe) {
let recipeIndex = this.state.menuRecipes.findIndex(recipeSaved=>recipeSaved.id === recipe.id); 
 console.log(recipeIndex) 
 if(recipeIndex === -1) {
    
    let addRecipe = this.state.menuRecipes.slice();
    addRecipe.push(recipe);
  
    this.setState({menuRecipes: addRecipe});
    console.log(this.state.menuRecipes)
  };
};

removeTrack(track) {
  let newState = this.state.playlistTracks.slice()
  let removeTrack = newState.filter(trackSaved => trackSaved.id !== Number(track.id));
  this.setState({playlistTracks: removeTrack});
}
updatePlaylistName(name){
  let oldPlaylistName = this.state.playlistName;
  this.setState({playlistName: name});
}

savePlaylist () {
  let trackURIs = []
  this.state.playlistTracks.map(element => {
    trackURIs.push(element.uri);
  });
  console.log(trackURIs);
  Spotify.savePlaylist(this.state.playlistName, trackURIs);
  this.setState({playlistName: 'New Playlist',
                playlistTracks: []})
};

search(term){
  Spotify.search(term).then(results => {
    this.setState({searchResults: results})
    console.log(this.state.searchResults)
})
}


  render () {
    return ( <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addRecipe}/>
          <Menu menuName={this.state.menuName} 
          menuRecipes={this.state.menuRecipes} 
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
          />
          </div>
        </div>
      </div>
    )
  }
};
export default App;

