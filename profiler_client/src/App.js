import React, { Fragment, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import  Login from "./components/auth/Login";
import  Register from "./components/auth/Register";
import Alert from './components/layout/Alert';
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/auth'
import { setAuthToken } from './utils/authToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './routing/PrivateRoute';
import CreateProfile from './components/create-profiles/CreateProfile';

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
          <Route exact path='/' component={Landing}/>
          <section className="container">
              <Alert />
              <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              </Switch>
          </section>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
