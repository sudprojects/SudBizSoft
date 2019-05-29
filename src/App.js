import React, { Component } from 'react';
import SignIn from './Components/SignIn/SignIn';
import Navigation from './Components/Navigation/Navigation';
import Register from './Components/Register/Register';
import CreateOrder from './Components/CreateOrder/CreateOrder';
import SearchOrders from './Components/SearchOrders/SearchOrders';
import AddProduct from './Components/AddProduct/AddProduct';
import { BrowserRouter, Route, Switch, IndexRoute } from 'react-router-dom';
import ls from 'local-storage';

import './App.css';

class App extends Component {


  state = {

    route: 'SignIn',
    user: {
        id: '',
        name: '',
        email: '',
        score: 0,
        joined: ''
      }

  }

//loadUser function will load user from database when user signs in
    loadUser = (data) => {

    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        score: data.score,
        joined: data.joined
       
    }})
     ls.set('lsuserid', data.id);
     
  }

//Navigating from one page to another
  onRouteChange = (route) =>{
  this.setState ({

  route: route
})

  }

  render() {
  return (
      <div className="App">
      <BrowserRouter>
      
      
      <Switch>
      <Route exact path = '/' render = {(props) => <SignIn loadUser = {this.loadUser} />} />
      <Route path = '/home/search' render = {(props) => <SearchOrders user = {this.state.user.id} />} />
      <Route path = '/home/register' render = {(props) => <Register loadUser = {this.loadUser} />}  />
      <Route path = '/home/create' render = {(props) => <CreateOrder user = {this.state.user.id} />} />
      <Route path = '/home/add' render = {(props) => <AddProduct user = {this.state.user.id} />} />

      <Route path = '/home' component = {Navigation} />
      </Switch>
      
      </BrowserRouter>
      </div>
    )

      

    }

  
}

export default App;