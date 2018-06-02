import React, {Component} from 'react'
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'

import Home from './Home'
import {slide as Menu} from 'react-burger-menu'

import Style from '../.././CSS/style.css'

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
            toDoArray: [],
            user: null
        }
    }

    componentWillMount = () => {
        const {noteArray} = this.state
        this.setState({user: this.props.user})
        axios('/users/getNotes').then(res => {
            // console.log('axios data', res)
            this.setState({noteArray: res.data.user})
        })
    }
    // Submits title for backend. A temporary workaround for saving todolist items
    // to backend
    submitTitle = () => {
        const {title} = this.state
        axios
            .post('/users/postTitleForTodoList', {title: title})
            .then()
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
            mode,
            noteArray
        } = this.state

        // Performs axios request to the backend (handles both requests for notes and
        // list items)
        if (mode === 'note') {
            axios.post('/users/postNote', {
                title: title,
                note: note,
                user_id: this.props.user.id
            })
        } else {
            toDoArray.map(ele => {
                axios.post('users/postToDoList', {
                    item: ele,
                    complete: false,
                    todo_list_id: '?'
                })
            })
            axios.post('users/postToDoList', {
                title: title,
                toDoList: toDoList
            })
        }

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

    // Change this name: Adds new todo item in the todo array
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
        // console.log('clicked', e.target.value)
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
        // console.log('text input', e.target.name)
    }

    removeBlock = e => {
        const {toDoList, noteArray, toDoArray} = this.state
        // console.log('toDoList', toDoList, 'noteArray', noteArray, 'toDoArray',
        // toDoArray)
        axios
            .post('/users/deleteNote', {title: e.target.value})
            .then(this.setState({
                noteArray: noteArray.filter(ele => {
                    if (ele.title !== e.target.value) {
                        return ele;
                    }
                })
            }))
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
            textField,
            user
        } = this.state
        if (user) {
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
                mode={mode}
                user={user}/>
        } else {
            return < Redirect to = '/login' />
    }
}

render() {
    return (
        <div>
            <div>
                <nav id='nav'>
                    <button onClick={this.props.logOut}>Logout</button>{' '} {/* <h2>Hello, {this.state.user.username}</h2> */}
                </nav>
            </div>
            <div>
                <Switch>
                    {/* <Route path='/login' component={this.renderLogin}/> */}
                    <Route exact path='/' component={this.renderTodoList}/>
                </Switch>
            </div>
        </div>
    )
}
}

export default ToDoRouter