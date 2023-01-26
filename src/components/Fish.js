import React from "react";
import PropTypes from "prop-types";
import {formatPrice} from '../helpers';

class Fish extends React.Component {
// defining propTypes for all props
static propTypes ={
details: PropTypes.shape({
  image: PropTypes.string,
  name:PropTypes.string,
  desc: PropTypes.string,
  status: PropTypes.string,
  price: PropTypes.number

}),
addToOrder: PropTypes.func

}


  // upon the click the addToOrder function is fired 
handleClick = () => {
    this.props.addToOrder(this.props.index)
} 


  render() {
    // use jsx destructuring 
    const {image, status, name, desc, price} = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className='menu-fish'>
        <img src={image} alt={name} />
        <h3 className='fish-name'>{name}</h3>
        <span className='price'>{formatPrice(price)}</span>
        <p> {desc}</p>
        <span className='status'>{status}</span>
        <button  onClick={this.handleClick} disabled={!isAvailable}>{isAvailable ? 'Add to Cart' : 'Sold Out!'}</button>
    
      </li>
    );
  }
}

// add to Cart button -> handleClick -> passes index to addToOrder 
// function in the App.js which in its turn sets the new state of the order
export default Fish;
