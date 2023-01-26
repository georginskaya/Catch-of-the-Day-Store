import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";

class Inventory extends React.Component {
static props ={
  fishes: PropTypes.object,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func
}

  render() {
    return (
      <div className='inventory'>
        <h2>Inventory</h2>
        {/* For each fish in our inventory, render an EditFish Component */}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
          deleteFish={this.props.deleteFish}
            key={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            index={key}
          />
        ))}

        {/* // sending function addFish which was created in the App.js
        we dont renedr AppFishForm in App.js - thats why sending via Inventory */}
        <AddFishForm addFish={this.props.addFish} />
        <button className='fish-edit' onClick={this.props.loadSampleFishes}>
          Load Samples
        </button>
      </div>
    );
  }
}

export default Inventory;
