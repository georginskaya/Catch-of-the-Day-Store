import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  // ref is the way to refer to an element inside of jsx
  // and as in my case get the value of an input
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addToOrder: PropTypes.func
  };

  createFish = (event) => {
    // stop the page rom reloading
    event.preventDefault();
    // storing data from the form in an object
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };

    // apply the method from App.js on your fish you created -> pass the fish object to it
    this.props.addFish(fish);
    // refresh the form: (clears out the form fields)
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className='fish-edit' onSubmit={this.createFish}>
        <input
          className=' name '
          ref={this.nameRef}
          type='text'
          placeholder='Name'
        ></input>
        <input
          className=' price'
          ref={this.priceRef}
          type='text'
          placeholder='Price'
        ></input>
        <select className='status' ref={this.statusRef}>
          <option value='available'> Fresh!</option>
          <option value='unavailable'> Sold Out!</option>
        </select>
        <textarea
          className='desc'
          ref={this.descRef}
          placeholder='Desc'
        ></textarea>
        <input
          className='image'
          ref={this.imageRef}
          type='text'
          placeholder='Image'
        ></input>
        <button type='submit'> + Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
