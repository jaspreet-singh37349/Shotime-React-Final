import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import anime from "./components/layout/AnimePage";
import movie from "./components/layout/MoviePage";
import tvshow from "./components/layout/TVshow";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Post from './components/post/Post';
import AnimeDetails from './components/details/animeDetails';
import MovieDetails from './components/details/movieDetails';
import TvShowDetails from './components/details/tvshowDetails';
import WatchList from './components/watchlist/watchlist';
import MyAnimes from './components/watchlist/myanimes';
import MyMovies from './components/watchlist/mymovies';
import MyTVshows from './components/watchlist/mytvshow';
import Search from './components/layout/search';

import './App.css';
import './style.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/anime" component={anime} />
              <Route exact path="/anime/animeDetails" component={AnimeDetails} />
              <Route exact path="/movie" component={movie} />
              <Route exact path="/movie/movieDetails" component={MovieDetails} />
              <Route exact path="/tvshow" component={tvshow} />
              <Route exact path="/tvshow/tvDetails" component={TvShowDetails} />
              <Route exact path="/watchlist" component={WatchList} />
              <Route exact path="/myanimes" component={MyAnimes} />
              <Route exact path="/mymovies" component={MyMovies} />
              <Route exact path="/mytvshows" component={MyTVshows} />
              <Route exact path="/anime/search" component={Search} />
              
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
