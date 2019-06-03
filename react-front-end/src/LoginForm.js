/*global chrome*/
import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';


class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUserId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).sub : null,
      currentUserName: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).name : null,
      currentUserEmail: null
    }
  }
  login = e => {
    e.preventDefault()
    axios('/api/user_token', {
      method: "post",
      data: {auth: {
          email: e.target.elements.email.value, 
          password: e.target.elements.password.value
        }}
    })
    .then(response => {
      localStorage.setItem("jwt", response.data.jwt);
      
      // The ID of the extension we want to talk to.
      const editorExtensionId = "imhbkmffbjhkfijjbfjamdcpfnlfalna";
      // Send the token:
      chrome.runtime.sendMessage(editorExtensionId, {token: response.data.jwt},
        function(response) {
          if (!response.success)
            return false;
        });
      let decodedToken = jwtDecode(response.data.jwt)
      //console.log(decodedToken)
      this.setState({
        currentUserId: decodedToken.sub,
        currentUserName: decodedToken.name,
        currentUserEmail: JSON.parse(response.config.data).auth.email
      })
      // load the wishlists after login
      window.location.reload();
      // this.props.reloadPage()
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="login-container" >   
        <br/><br/>   
          <form onSubmit={this.login}> 
            <TextField className='input' name="email" label="Your Email"/>
            <br/><br/>
            <TextField className='input' name="password" label='Your Password' />
            <br/><br/>
            <Button type='submit' variant="contained" style={{backgroundColor: "#E1B8B1"}} >
              Login 
            </Button>
          </form>
        </div>
    </React.Fragment>
    )
  }
}

export default withTheme()(LoginForm)