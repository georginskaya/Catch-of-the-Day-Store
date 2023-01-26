import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';
import StorePicker from './StorePicker';
import NotFound  from './NotFound';


const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* All the routes will be stored here */}
      {/* After a slash render a StorePicker */}
      <Route exact path='/' component={StorePicker} />
      {/* After that render an App  */}
      <Route path='/store/:storeid' component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;