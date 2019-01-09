import React, { Component } from 'react'
import '../.././CSS/style.css'
import TodoList from './TodoList'
import TodoListFromCloud from './TodoListFromCloud'

import ContentEditable from 'react-simple-contenteditable';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfToDoObjectArray: [],
            checked: false,
            notes: [],
            arrayOfKeys: []
        }
    }

    componentDidMount = () => {
        this.formatData()
    }

    //finsh this
    formatData = () => {
        const { listObj } = this.props
        var listOfTodoObj = [];
        var todo = [];
        var todoArray = [];

        for (var i = 1; i <= Object.keys(listObj).length; i++) {
            listOfTodoObj.push({ title: listObj[i].title });
        }

        for (var property in listObj) {
            if (listObj[property]) {
                todoArray.push(listObj[property]);
            }
        }

        for (var i = 0; i < todoArray.length; i++) {
            listOfTodoObj[i].todo = todoArray[i]
        }

        this.setState({ listOfToDoObjectArray: listOfTodoObj })
    }

    renderTodoList = ele => {
        //ele = {title: "csdcsc", toDoList: Array(3), complete: false}
        return <TodoList
            key={ele.title}
            toDoObject={ele}
            removeBlock={this.props.removeBlock} />
    }

    renderTodoListFromCloud = ele => {
        //ele = {title: "csdcsc", toDoList: Array(3), complete: false}
        return <TodoListFromCloud
            key={ele.title}
            toDoObject={ele}
            removeBlock={this.props.removeBlock} />
    }

    render() {

        const {
            onSubmitToDoListForPreview,
            submitList,
            handleTitileInput,
            handleInput,
            toDoList,
            toggleComplete,
            toggleMode,
            handleTextField,
            noteArray,
            mode,
            note,
            task,
            title,
            handleKeyPress,
            handleNoteChange,
            toDoArray,
            handleClick,
            textField,
            removeBlock,
            user,
            handleClose,
            listObj
        } = this.props

        return (
            <div id='container'>
                <input
                    id='todoInput'
                    className='input'
                    placeholder='take a note ...'
                    type='text'
                />
            </div>
        )
    }
}

export default Home