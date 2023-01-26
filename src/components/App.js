
import React from "react"; 
import Header from "./Header"
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from '../base';
import PropTypes from "prop-types";



class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static PropTypes ={ 
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match;
    // reinstate localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    // if there is a localstorage string set the state to it
    //and parse it into an object (opposite from stringify)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // synchronizing the store with the database
    // whatever store id is geenrated, it is synchronized with database
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      // fishes is the state that is going to be sinked
      state: "fishes",
    });
  }

  // storing order data to local storage with the help of
  // componentDidUpdate

  componentDidUpdate() {
    console.log(this.state.order);
    // stick the order for the specific store in the local storage
    // the value is now sent as an object. We need to convert it into string using JSON stringify
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  // another life cycle method
  // remove binding to database once i leave the page
  // to clean up memory issues and to avaid data leak

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    //1. take a copy of the exsisting state (using object spread ...)
    const fishes = { ...this.state.fishes };
    // 2. then you add your new fish to that fishes and give it a unique id with a date
    // fishes is euqal to the fish that got passed in
    // inserting the new fish to the fishes  with a certain id (date)
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state:
    this.setState({
      fishes: fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    //1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    //2. update that state
    fishes[key] = updatedFish;
    // 3. setthat to state
    this.setState({ fishes });
    // finally, send this method to inventtory component
    // and from there to EditFishForm component
  };

  // deleting a fish
  deleteFish = (key) => {
    //1. take a copy of state
    const fishes = { ...this.state.fishes };
    //2. update the state
    fishes[key] = null;
    //3. update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };
  // index (key) is first generated from the array here (Object.keys), then sent
  //to Fish Compoennt where this funciton is fired and from there sent to here again
  // from here it is pushed into state above
  // and that state is sent via props to Order - Component
  addToOrder = (key) => {
    //1. take a copy of the exsisting state (using object spread ...)
    const order = { ...this.state.order };
    // 2 either add to the order or update the number
    order[key] = order[key] + 1 || 1;
    // 3. set the new state:
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key] ;
    this.setState({ order });
  };

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Daily'/>
          <ul className='fishes'>
            {/* So: you set the state of fishes to the sample fishes 
            here with Object.key you turn the state into array and assign a key to each element 
            then you take each of those elements and map through it 
            there is no real function after map but an implicit return -> FishComponent is being returned
             for every element of the array */}

            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                addToOrder={this.addToOrder}
                key={key}
                index={key}
                details={this.state.fishes[key]}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          loadSampleFishes={this.loadSampleFishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;