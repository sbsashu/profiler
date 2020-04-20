import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import CreateProfile from '../components/create-profiles/CreateProfile';
import EditProfile from '../components/create-profiles/EditProfile';
import Profiles from '../components/profiles/Profiles';
import Profile from '../components/profile/Profile';
import Posts from '../components/posts/Posts';
import Post from '../components/post/Post';
import AddExperience from '../components/create-profiles/AddExperience';
import AddEducation from '../components/create-profiles/AddEducation';
import NotFound from '../components/layout/NotFound';
import  Login from "../components/auth/Login";
import  Register from "../components/auth/Register";
import Alert from '../components/layout/Alert';

const Routes = () => {
    return (
        <section className="container">
        <Alert />
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
          <PrivateRoute exact path='/posts' component={Posts} />
          <PrivateRoute exact path='/post/:id' component={Post} />
          <Route component={NotFound} />
        </Switch>
    </section>
    )
}

export default Routes;
