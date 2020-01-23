import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };
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
          this.auth = window.gapi.auth2.getAuthInstance();
          //update our component level state with the property called isSigned in and force the compponent to rerender
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          //or
          //   this.onAuthChange();
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  renderAuthBtn() {
    if (this.state.isSignedIn === null) {
      return <div>I don't know if you are signed in.</div>;
    } else if (this.state.isSignedIn) {
      return <div>I am signed in</div>;
    } else {
      return <div>I am not signed in</div>;
    }
  }

  //this is a call back function and it needs to be set up as an arrow function inorder to be bound to the component.
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };
  render() {
    console.log(this.state.isSignedIn);
    return <div>{this.renderAuthBtn()}</div>;
  }
}

export default GoogleAuth;
