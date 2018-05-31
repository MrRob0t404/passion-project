import React, {Component} from 'react';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import LoginUser from './Login/login';
import RegisterUser from './Login/register';
import ToDoRouter from './ToDo/Components/ToDoRouter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true
    }
  }

  // functions passed as Props

  UserFound = user => {
    this.setState({user: user});
  };

  logOut = () => {
    const {user} = this.state;
    axios
      .get("/users/logout")
      .then(res => {
        // console.log(`this is the response`,res.data)
        this.setState({user: null});
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios
      .get("/users/getLoggedinUser")
      .then(res => {
        this.setState({user: res.data.user, loading: false});
      })
      .catch(err => {
        console.log(`errrr`, err);
        this.setState({loading: false})
      });
  }

  // Components
  handleLoginUser = () => {
    const {user} = this.state
    if (user) {
      return <Redirect to='/'/>
    } else {
      return <LoginUser setUser={this.UserFound}/>
    }
  }

  handleRegisterUser = () => {
    const {user} = this.state;
    if (user) {
      return <Redirect to='/'/>
    } else {
      return (<RegisterUser setUser={this.UserFound}/>)
    }
  }

  handleToDoRouter = () => {
    const {user, loading} = this.state
    if(!user){
      return <Redirect to='/login' />
    } else {
      return (<ToDoRouter user={user} logOut={this.logOut} loading={loading}/>)      
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={this.handleLoginUser}/>
          <Route path='/register' component={this.handleRegisterUser}/>
          <Route path='/' component={this.handleToDoRouter}/>
        </Switch>
      </div>
    )
  }
}

export default App;