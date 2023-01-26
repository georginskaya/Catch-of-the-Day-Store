import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  static = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
  };

  handlechange = (event) => {
    // update that fish
    // 1. take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      // 2. overwriting one thing that changed -> new feature qith square brackets
      [event.currentTarget.name]: event.currentTarget.value,
    };
    console.log(updatedFish);
    // 3. now send the updated fish to the App component updateFish method
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className='fish-edit'>
        <input
          type='text'
          name='name'
          // to make typing in inventory possible, I listen to changes in the field
          onChange={this.handlechange}
          value={this.props.fish.name}
        />
        <input
          type='text'
          name='price'
          onChange={this.handlechange}
          value={this.props.fish.price}
        />
        <select
          type='text'
          name='status'
          onChange={this.handlechange}
          value={this.props.fish.status}
        >
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea
          name='desc'
          onChange={this.handlechange}
          value={this.props.fish.desc}
        />
        <input
          type='text'
          name='image'
          onChange={this.handlechange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;

