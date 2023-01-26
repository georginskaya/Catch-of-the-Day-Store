import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group"; 
import PropTypes from "prop-types";



class Order extends React.Component {
  static props = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
    
  };

  // make render function in case your render has too much code
  renderOrder = (key) => {
    // grab the fish you are looping over
    const fish = this.props.fishes[key];
    // know how many you bought
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    const transitionOptios = {
      classNames: "order",
      key,
      timeout: { enter: 550, exit: 550 },
    };

    //maake sure the fish is loaded before we continue
    if (!fish) return null;

    if (!isAvailable) {
      <CSSTransition {...transitionOptios}>
        return (
        <li key={key}>Sorry {fish ? fish.name : "fish"} is not available</li>
        );{" "}
      </CSSTransition>;
    } else {
      return (
        <CSSTransition {...transitionOptios}>
          <li key={key}>
            <span>
              <TransitionGroup component='span' className='count'>
                <CSSTransition
                  classNames='count'
                  key={count}
                  timeout={{ enter: 5000, exit: 5000 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name}
              {formatPrice(count * fish.price)}
              <button onClick={() => this.props.removeFromOrder(key)}>
                &times;
              </button>
            </span>
          </li>
        </CSSTransition>
      );
    }
  };
  render() {
    // first thing you need here is an array of order IDs:
    const orderIDs = Object.keys(this.props.order);
    // runing reduce because I need one total value at the end
    const total = orderIDs.reduce((prevTotal, key) => {
      // grab the fish you are looping over
      const fish = this.props.fishes[key];
      // know how many you bought
      const count = this.props.order[key];
      // boolean to know if that fish is available
      // check is there is a fish (it was not deleted) and its status is available
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className='order-wrap'>
        <h2> Your Order</h2>
        <TransitionGroup component='ul' className='order'>
          {orderIDs.map(this.renderOrder)}
        </TransitionGroup>

        <div className='total'>
          Total: <strong> {formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
