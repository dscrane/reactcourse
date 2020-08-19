import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../../redux/actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        client_id: '180926525521-5ii5a8cua6b9nn3g84cugfmm6g02n8ak.apps.googleusercontent.com',
        scope: 'email'
      })
      .then(() => {
        this.auth = window.gapi.auth2.getAuthInstance()
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange)
      });
    });
  }

  onAuthChange = isSignedIn => isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut();

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          className='ui red google button'
          onClick={this.onSignOutClick}
        >
          <i className='google icon' />
          Sign Out
        </button>
      )
    } else {
      return (
        <button
          className='ui green google button'
          onClick={this.onSignInClick}
        >
          <i className='google icon' />
          Google Sign In
        </button>
      )
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

