import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import Wishlist from './Wishlist.js';
import Navbar from './Navbar.js';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  render() {
    return (
      <Router>
      <div className="App">
      < Navbar />
      <Wishlist />
      <Route path="/wishlist" component={Wishlist} />
      </div>
      </Router>
    );
  }
}

export default App;
