import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class ShareForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sharedWith: [],
      sendToEmail: null
    }
  }

  shareWishlist = e => {
    e.preventDefault()
    console.log('sharing...')
    console.log(this.props.wishlist.id)
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: 'post', 
      url: '/api/user_wishlists', 
      data: {
        info: { 
          wishlist_id: this.props.wishlist.id,
          email: e.target.elements.email.value
        }
      },
      headers: {'Authorization': token }
    })
    .then(response => {
      console.log(response)
      // this.setState({
      //   sendToEmail: null
      // })
    })
    .catch(error => {
      console.log(error)
    }) 
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: 'get', 
      url: '/api/user_wishlists', 
      params: {
        wishlistId: this.props.wishlist.id
      },
      headers: {'Authorization': token }
    })
    .then(response => {
      let sharedWithUsers = []
      for(let i of response.data){
        sharedWithUsers.push(i.user)
      }
      console.log(sharedWithUsers)
      this.setState({
        sharedWith: sharedWithUsers
      })
    })
    .catch(error => {
      console.log(error)
    }) 

  }

  render() {
    return (
      <div className="share-container">      
        <form onSubmit={this.shareWishlist}> 
          <TextField className='input' name="email" label="Your Friend's Email Address" />
          <br/><br/>
          <Button type='submit' className="shareBtn" variant="outlined">
            Share 
          </Button>
        </form>
        <div>
          {this.state.sharedWith.length >= 1 ?
          (<div >Shared With <br/>
            {this.state.sharedWith.map(user => (
              <li key={user.id}>{user.username}: {user.email}</li>
            ))} </div>): null
           }
          
        </div>
      </div>
    )
  }
}