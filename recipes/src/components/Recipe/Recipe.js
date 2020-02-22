import React from 'react';
import './Recipe.css'; 

class Recipe extends React.Component {

  constructor(props) {
    super(props);
    this.addRecipe = this.addRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
  }
  
  renderAction () {
  if (this.props.isRemoval){
    return <button className='Track-action' onClick={this.removeRecipe}>-</button>
  } else {return <button className='Track-action' onClick={this.addRecipe}>+</button>}
} 

  addRecipe () {
    this.props.onAdd(this.props.searchResults);
  }

  removeRecipe () {
    this.props.onRemove(this.props.searchResults);
  }

  render() {
      

        return (
          <div className="Track" id="recipes">
          <div className="Track-information">
            <h3>{this.props.searchResults.name}</h3>
            <p>{this.props.searchResults.course} | {this.props.searchResults.difficult}</p>
            <br/>
            <p>{this.props.searchResults.description}</p>
          </div>
            {this.renderAction()};
          </div>
        );
    };
};

export default Recipe;