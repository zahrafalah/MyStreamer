import React from "react";
import { connect } from "react-redux";
import { signOut, signIn } from "../actions";

class GoogleAuth extends React.Component {
  //component level state/ we no longer use it since e are using redux
  // state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      //init will return a promise
      window.gapi.client
        .init({
          clientId:
            "197089534681-uepcqh9cjoubmvtcffk0ad4e507n99uq.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          //Inotialize our gapi library
          this.auth = window.gapi.auth2.getAuthInstance();
          //update our component level state with the property called isSigned in and force the compponent to rerender
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          //or
          // this.onAuthChange();
          //Using Redux: Immediatly update our auth state of our redux store
          this.onAuthChange(this.auth.isSignedIn.get());
          //Sit around and wait for thet authentication changes
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  HandleSignIn = () => {
    this.auth.signIn();
  };
  HandleSignOut = () => {
    this.auth.signOut();
  };
  //this is a call back function and it needs to be set up as an arrow function inorder to be bound to the component.
  onAuthChange = isSignedIn => {
    //Component level State/ we no longer need it since we are using Redux and we need to change the state at the app level as compare to component level
    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    if (isSignedIn) {
      //calling the action creators to update the redux store
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthBtn() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.HandleSignOut}>
          <i className="google icon" />
          SignOut
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.HandleSignIn}>
          <i className="google icon" />
          SignIn with Google
        </button>
      );
    }
  }

  render() {
    console.log(this.props.isSignedIn);
    return <div>{this.renderAuthBtn()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
