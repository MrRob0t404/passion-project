import React, {Component} from 'react'
import {Link, Switch, Route} from 'react-router-dom'

import ToDoRouter from './ToDo/ToDoRouter'

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ToDoRouter}/>
        </Switch>
      </div>
    )
  }
}

export default App