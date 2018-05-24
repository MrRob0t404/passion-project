import React, {Component} from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import LoginUser from '../Login/login'

//inport compnents
import Home from './Home'

import Style from '../CSS/style.css'

class ToDoRouter extends Component {
    constructor() {
        super();
        this.state = {
            mode: 'list', //Default mode
            textField: false,
            note: '',
            list: '',
            title: '',
            task: '',
            toDoList: [],
            noteArray: [],
            toDoArray: []
        }
    }

    // Handles todo list submittion
    submitList = e => {
        e.preventDefault();
        const {
            toDoArray,
            toDoList,
            task,
            title,
            note,
            noteArray
        } = this.state

        // ternary to submit either todo list or note
        this.state.mode === 'list'
            ? this.setState({
                toDoArray: [
                    ...toDoArray, {
                        title: title,
                        toDoList: toDoList,
                        complete: false
                    }
                ],
                title: '',
                task: '',
                toDoList: [],
                textField: false
            })
            : this.setState({
                noteArray: [
                    ...noteArray, {
                        title: title,
                        note: note
                    }
                ],
                note: '',
                title: '',
                textField: false

            })
    }

    // Change this name
    onSubmitToDoListForPreview = e => {
        e.preventDefault();
        const {toDoList, task} = this.state
        this.setState({
            toDoList: [
                ...toDoList,
                task
            ],
            task: ''
        })
    }

    //shows secondary input field (list | notes)
    handleClick = () => {
        this.setState({textField: true})
    }

    //Sets mode to list or note
    toggleMode = e => {
        this.setState({mode: e.target.name, textField: true})
    }

    //handles secondary input 
    handleInput = e => {
        const {task} = this.state
        // console.log(e.target.value)
        this.setState({task: e.target.value})

    }

    //Not sure what this does yet 
    toggleComplete = e => {
        console.log('clicked', e.target.value)
    }

    //Handles note changing
    handleNoteChange = e => {
        this.setState({note: e.target.value})
    }

    //Handles input for title input box
    handleTitileInput = e => {
        this.setState({title: e.target.value})
    }

    //Handles user input for text field
    handleTextField = e => {
        console.log('text input', e.target.name)
    }

    removeBlock = () => {
        console.log('removed')
    }

    // Renders todo list
    renderTodoList = () => {
        const {
            input,
            toDoList,
            mode,
            task,
            title,
            toDoArray,
            noteArray,
            note,
            textField
        } = this.state

        return <Home
            onSubmitToDoListForPreview={this.onSubmitToDoListForPreview}
            submitList={this.submitList}
            handleTitileInput={this.handleTitileInput}
            handleInput={this.handleInput}
            handleClick={this.handleClick}
            handleNoteChange={this.handleNoteChange}
            toDoList={toDoList}
            toDoArray={toDoArray}
            noteArray={noteArray}
            toggleComplete={this.toggleComplete}
            toggleMode={this.toggleMode}
            handleTextField={this.handleInput}
            removeBlock={this.removeBlock}
            task={task}
            note={note}
            title={title}
            textField={textField}
            mode={mode}/>
    }

    renderLogin = () => {
        return <LoginUser/>
    }

    render() {
        return (
            <div>
                <div>
                    <nav id='nav'>
                        <Link to='/'>Home</Link>{' '}
                        <Link to='/login'>Login</Link>{' '}
                    </nav>
                </div>
                <div>
                    <Switch>
                        <Route exact path='/' component={this.renderTodoList}/>
                        <Route path='/login' component={this.renderLogin}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ToDoRouter