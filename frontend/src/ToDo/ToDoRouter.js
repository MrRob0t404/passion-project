import React, {Component} from 'react'
import {Link, Switch, Route} from 'react-router-dom'

//inport compnents
import Home from './Home'

class ToDoRouter extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            toDoArray: []
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const {toDoArray, input} = this.state
        this.setState({
            toDoArray: [
                ...toDoArray,
                input
            ],
            input: ''
        })
    }

    handleInput = e => {
        this.setState({input: e.target.value})
    }

    renderTodoList = () => {
        return <Home onSubmit={this.onSubmit} handleInput={this.handleInput} value={this.state.input}/>
    }

    render() {
        console.log('state:', this.state)
        return (
            <div>
                <div>
                    <nav>
                        <Link to='/'>Home</Link>
                    </nav>
                </div>
                <div>
                    <Switch>
                        <Route exact path='/' component={this.renderTodoList}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ToDoRouter