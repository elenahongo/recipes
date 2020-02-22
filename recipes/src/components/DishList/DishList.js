import React from 'react';
import './DishList.css';
import Recipe from '../Recipe/Recipe'

class DishList extends React.Component {

    render() {

        return (
            <div className="TrackList">
                { 
                    this.props.searchResults.map(element => {
                    return <Recipe searchResults={element}
                       key={element.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
                })
                }
            </div>
        )
    }
};

export default DishList;
