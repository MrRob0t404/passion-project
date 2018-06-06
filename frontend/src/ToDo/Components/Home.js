import React, {Component} from 'react'
import axios from 'axios'
import Style from '../.././CSS/style.css'
import Checkbox from './Checkbox'
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
        const {listObj} = this.props
        var listOfTodoObj = [];
        var todo = [];
        var todoArray = [];

        for (var i = 1; i <= Object.keys(listObj).length; i++) {
            listOfTodoObj.push({title: listObj[i].title});
        }
        // console.log('listObj', listObj)

        for (var property in listObj) {
            if (listObj[property]) {
                todoArray.push(listObj[property]);
            }
        }
        // console.log('todoArray', todoArray)
        for (var i = 0; i < todoArray.length; i++) {
            listOfTodoObj[i].todo = todoArray[i]
        }
        console.log('listOfTodoObj: ', listOfTodoObj);

        this.setState({listOfToDoObjectArray: listOfTodoObj})
    }

    renderTodoList = ele => {
        //ele = {title: "csdcsc", toDoList: Array(3), complete: false}
        return <TodoList
            key={ele.title}
            toDoObject={ele}
            removeBlock={this.props.removeBlock}/>
    }

    renderTodoListFromCloud = ele => {
        //ele = {title: "csdcsc", toDoList: Array(3), complete: false}
        return <TodoListFromCloud
            key={ele.title}
            toDoObject={ele}
            removeBlock={this.props.removeBlock}/>
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

        // console.log('listObj', this.props.listObj)
        console.log('listOfToDoObjectArray', this.state.listOfToDoObjectArray)

        return (
            <div id='container'>
                <div id='inputTitle'>
                    <div id='inputContainer'>
                        {/* renders  title for list */}
                        <input
                            id='titleInputBox'
                            className='input'
                            placeholder='Title'
                            type='text'
                            onChange={handleTitileInput}
                            name={mode}
                            value={title}
                            onClick={handleClick}/> {/* either renders input box for to do list or text input field for notes */}
                        {mode === 'list' && textField
                            ? <form onSubmit={onSubmitToDoListForPreview}><input
                                    id='todoItem'
                                    name='task'
                                    placeholder='item'
                                    type='text'
                                    value={task}
                                    onKeyPress={handleKeyPress}
                                    onChange={handleInput}/></form>
                            : mode === 'note' && textField
                                ? <div id="note" contentEditable='true' data-text="Take a note..."></div>

                                : ''}
                    </div>
                    {mode === 'list'
                        ? <button className='modeButton' onClick={toggleMode} name='note'>
                                note
                            </button>
                        : <button className='modeButton' onClick={toggleMode} name='list'>
                            List
                        </button>}

                    <div>
                        {/* iterates through toDoList and renders list on screen  before submission */}
                        <ul>
                            {toDoList.map(element => {
                                return <li>{element}</li>
                            })}
                        </ul>
                        <button type='submit' onClick={submitList}>Done</button>
                        {textField
                            ? <button id="closeButton" onClick={handleClose}>Close</button>
                            : ''}
                    </div>
                </div>
                <div>
                    <div id='itemContainter'>
                        {/* iterates through toDoList and renders each todo list in its own container  */}
                        {this
                            .state
                            .listOfToDoObjectArray
                            .map(ele => {
                                return (this.renderTodoListFromCloud(ele))
                            })}
                        
                        {/* {toDoArray[0]
                            ? toDoArray.map(element => {
                                return (
                                    <div className='toDoBlockContainer container'>
                                        <h1 id='title'>{element.title}</h1>
                                        <h2 className="undone" aria-hidden="true">Not Done</h2>
                                        {this.createCheckBoxes()}

                                        <h2 className="done" aria-hidden="true">Done</h2>

                                        <button onClick={removeBlock}>delete</button>
                                    </div>
                                )
                            })
                            : ''} */}

                        {/* iterates through noteArray and renders each todo list in its own container  */}
                        {noteArray.map(ele => {
                            return (
                                <div className='noteBlock' key={ele.title}>
                                    <h3 className='noteTitle'>{ele.title}</h3>
                                    <p className='noteBody'>{ele.note}</p>
                                    <button className='deleteButton' onClick={removeBlock} value={ele.title}>delete</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home