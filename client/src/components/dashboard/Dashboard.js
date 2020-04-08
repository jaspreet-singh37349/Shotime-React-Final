import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Dashboard extends Component {
  

  render() {
    const { user } = this.props.auth;

    return (
      <div className="landing">
        <div className="dark-overlay down text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4 showtime">ShowTime</h1>
                <h2 className="large mb-4 text4">
                  {' '}
                  Welcome {user.name}
                </h2>
                <div className="downn">
                <p className="text2">
                  {' '}
                  You can search any Movies, TVshows or Animes on this site
                  and can add to your watchlist.
                </p>
                </div>
                <hr />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
  Dashboard
);
