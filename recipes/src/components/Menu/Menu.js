import React from 'react';
import './Menu.css';
import DishList from '../DishList/DishList'


class Menu extends React.Component {

  constructor(props){
    super(props);
    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    const name = (e.target.value)
    this.props.onNameChange(name)
  }   

    render () {
        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
               <DishList searchResults={this.props.menuRecipes} onRemove={this.props.onRemove} isRemoval={true}/>
            <button className="Playlist-save" onClick={this.props.onSave}>Get pantry list</button>
            </div>
        )
    }
}

export default Menu