import React, { Fragment, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/auth'
import { setAuthToken } from './utils/authToken';
import Routes from './routing/Routes';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}
const  App = () => {
  useEffect(() => {
      store.dispatch(loadUser());
  }, [])

return (
  <Provider store={store}>
    <Fragment>
        <Router>
          <NavBar/>
            <Switch>
            <Route exact path='/' component={Landing}/>
            <Route component={Routes}/>
            </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
