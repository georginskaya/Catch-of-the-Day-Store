
import React from 'react'; 
import {getFunName} from '../helpers';

class StorePicker extends React.Component {



  myInput = React.createRef(); // creatin a ref

goToStore = (event) => {
    // 1. stop the page from reloading 
    event.preventDefault (); 
  // 2. get the text from the input 
  const storeName= this.myInput.current.value;
  //3. push it to Router to change the page to /store/input-whateva 
  // you are pushing it into the history-prop which Router/Component has
  this.props.history.push(`/store/${storeName}`);
}

  render() {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        <h2>Please select a store</h2>
        <input
          type='text'
          ref={this.myInput} // ref allow you to refernce a dom node 
          required
          placeholder='Store name'
          defaultValue={getFunName()}
        ></input>
        <button type='submit'>Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;