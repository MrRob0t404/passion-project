import React, {Component} from 'react'
import {Link, Switch, Route} from 'react-router-dom'

//inport compnents
import Home from './Home'

class ToDoRouter extends Component {
    constructor() {
        super();
        this.state = {
            mode: 'note',
            note: '',
            list: '',
            input: '',
            toDoArray: []
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const {toDoArray, input} = this.state
        this.setState({
            toDoArray: [
                ...toDoArray, {
                    task: input,
                    complete: false
                }
            ],
            input: ''
        })
    }

    handleInput = e => {
        this.setState({input: e.target.value})
    }

    toggleComplete = e => {
        console.log('toggleComplete', e.target.value)
    }

    toggleMode = e => {
        this.setState({mode: e.target.name})
    }

    handleTextField = e => {
        console.log('text input', e.target.name)
    }

    renderTodoList = () => {
        const {input, toDoArray, mode} = this.state
        return <Home
            onSubmit={this.onSubmit}
            handleInput={this.handleInput}
            value={input}
            toDoArray={toDoArray}
            toggleComplete={this.toggleComplete}
            toggleMode={this.toggleMode}
            handleTextField={this.handleInput}
            mode={mode}/>
    }
    render() {
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