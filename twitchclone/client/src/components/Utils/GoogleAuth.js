import React, { Component } from 'react';

export class GoogleAuth extends Component {
  state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        client_id: '180926525521-5ii5a8cua6b9nn3g84cugfmm6g02n8ak.apps.googleusercontent.com',
        scope: 'email'
      })
      .then(() => {
        this.auth = window.gapi.auth2.getAuthInstance()
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange)
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }

  onSignIn = () => {
    this.auth.signIn();
  }

  onSignOut = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button
          className='ui red google button'
          onClick={this.onSignOut}
        >
          <i className='google icon' />
          Sign Out
        </button>
      )
    } else {
      return (
        <button
          className='ui green google button'
          onClick={this.onSignIn}
        >
          <i className='google icon' />
          Sign In
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

