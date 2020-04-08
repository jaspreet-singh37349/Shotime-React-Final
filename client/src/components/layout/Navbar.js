import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import animapi from '../api/animeApi'
import movieapi from '../api/movieApi'
import tvapi from '../api/tvshowApi'
import store from '../../store';

class Navbar extends Component {

  componentDidMount(){
    var url = window.location.pathname;
    console.log(url);
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('search');
    if(url==='/anime')
    {
      document.getElementById("srch").style.display="block";
      if(myParam)
      {
        animapi(myParam,this.props.auth.isAuthenticated);
      }
    }
    else if(url==='/movie')
    {
      document.getElementById("srch").style.display="block";
      if(myParam)
      {
        movieapi(myParam,this.props.auth.isAuthenticated);   
      }
    }
    else if(url==='/tvshow')
    {
      document.getElementById("srch").style.display="block";
      if(myParam)
      {
        tvapi(myParam,this.props.auth.isAuthenticated);
      }
    }
    else
    {
      document.getElementById("srch").style.display="none";
    }
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  Search = (e)=>
  {
    e.preventDefault();
    var txt = document.getElementById("inputSearch").value;
    if(window.history.pushState){
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search='+txt;
    window.history.pushState({path:newurl},'',newurl);
    }
    if(store.getState().type.type==='Anime')
    {
      animapi(txt,this.props.auth.isAuthenticated);
    }
    else if(store.getState().type.type==='Movie')
    {
      movieapi(txt,this.props.auth.isAuthenticated);
    }
    else if(store.getState().type.type==='TV')
    {
      tvapi(txt,this.props.auth.isAuthenticated);
    }
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" onClick={noclk} to="/watchlist">
            WatchList
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" onClick={noclk} to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={noclk} to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const srch = (
      <React.Fragment>
        <div id="srch">
        <li className="nav-item left">
        <form className="form-inline ml-auto" onSubmit={this.Search}>
          <div className="md-form my-0"></div>
        <input type="text" id="inputSearch" placeholder="Search..." aria-label="Search" className="form-control"></input>
        <div onClick={this.Search}>
        <i id="search" className="fas fa-search text-white ml-3" aria-hidden="true"></i>
        </div>
        </form>
      </li>
      </div>
      </React.Fragment>
    );

    function clk(){
      document.getElementById("srch").style.display="block";
    }
    function noclk(){
      document.getElementById("srch").style.display="none";
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" onClick={noclk} to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" onClick={clk} to="/anime">
                  {' '}
                  Anime
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={clk} to="/movie">
                  {' '}
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={clk} to="/tvshow">
                  {' '}
                  TV Shows
                </Link>
              </li>
              {srch}
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  Navbar
);
