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
            user: null,
            listObj: null
        }
    }

    componentDidMount = () => {
        const {noteArray} = this.state

        axios('/users/getNotes').then(res => {
            // console.log('axios data', res)
            this.setState({noteArray: res.data.user})
        }).then(() => {
            axios
                .get('/users/getListTitle')
                .then(res => {
                    console.log('res1', res.data.data)
                    this.setState({
                        listObj: res
                            .data
                            .data
                            .reduce((obj, item) => {
                                obj[item.id] = item
                                return obj
                            }, {})
                    })
                })
                .then(() => {
                    axios
                        .get('/users/getListItems')
                        .then(res => {
                            let listObjCopy = this.state.listObj
                            res
                                .data
                                .data
                                .forEach(ele => {
                                    return listObjCopy[ele.todo_list_id][ele.todo_item] = ele.complete
                                })
                            this.setState({listObj: listObjCopy})
                        })
                })
        }).then(() => {
            this.setState({user: this.props.user})
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
            // console.log('list', true)
            axios.post('/users/postListTitle', {
                title: title,
                user_id: this.props.user.id
            })

            // Each element in todoArray => {title: "title", toDoList: Array(5), complete:
            // false}
                .then(res => {
                toDoList.map(ele => {
                    axios.post('users/postListItems', {
                        item: ele,
                        complete: false,
                        todo_list_id: res.data.data.id
                    })
                })
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

    //Closes the text input field
    handleClose = () => {
        this.setState({textField: false})
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
    handleNoteChange = ev => {
        // this.setState({note: e.target.value})
        var html = this
            .getDOMNode()
            .innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this
                .props
                .onChange({
                    target: {
                        value: html
                    }
                });
        }
        this.lastHtml = html;
    }

    //Handles input for title input box
    handleTitileInput = e => {
        this.setState({title: e.target.value})
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

    //formats list items to [{title: 'title', todoArray: [], complete: false}]
    formatIncomingData = () => {
        const {resData} = this.state
        this.setState({
            formatData: resData.filter(ele => {
                console.log()
                if (this.state.formatData.includes(ele.itle_of_todo_list) !== -1) {
                    return ele.title
                }
            })
        })
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
            user,
            listObj
        } = this.state

        console.log("this is what matters ", listObj)

        if (!listObj) {
            return (
                <div>loading</div>
            )
        } else {
            return (<Home
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
                user={user}
                listObj={listObj}
                handleClose={this.handleClose}/>)
        }
    }

    render() {
        if (this.state.noteArray) {
            return (
                <div>
                    <div>
                        <nav id='nav'>
                            <i class="fas fa-sign-out-alt fa-4x" onClick={this.props.logOut}></i>
                            <div id='logo'>
                                {/* <i class="fal fa-cloud-upload fa-4x"></i> */}
                                <i class="fas fa-cloud-upload-alt"></i>
                                CloudNotes</div>
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
        } else {
            return (
                <div>LOADING</div>
            )
        }
    }
}

export default ToDoRouter