import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import Groups from './components/Groups'
import SingleGroup from './components/SingleGroup'

import Events from './components/Events/Events';
import EventForm from './components/Events/EventForm'
import SingleEvent from './components/Events/SingleEvent'
import UpdateEventForm from './components/Events/UpdateEventForm'

import SplashPage from './components/SplashPage'


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/groups' exact={true}>
          <Groups />
        </Route>
        <Route path='/groups/:id' exact={true}>
          <SingleGroup />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route exact path='/events'>
          <Events />
        </Route>
        <Route exact path='/events/:id'>
          <SingleEvent />
        </Route>
        <Route path='/groups/:id/new-event'>
          <EventForm />
        </Route>
        <Route exact path='/events/:id/edit'>
          <UpdateEventForm />
        </Route>
        <Route exact path='/splash'>
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
