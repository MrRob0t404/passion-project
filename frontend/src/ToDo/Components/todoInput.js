import React, { Component } from 'react'

class TodoInput extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
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
                        onClick={handleClick} /> {/* either renders input box for to do list or text input field for notes */}
                    {mode === 'list' && textField
                        ? <form onSubmit={onSubmitToDoListForPreview}><input
                            id='todoItem'
                            name='task'
                            placeholder='item'
                            type='text'
                            value={task}
                            onKeyPress={handleKeyPress}
                            onChange={handleInput} /></form>
                        : mode === 'note' && textField
                            ? <input
                                id='noteInput'
                                placeholder="take a note...."
                                name='note'
                                onChange={handleNoteChange} />

                            : ''}
                </div>
                <div>
                    {mode === 'list'
                        ? <button className='modeButton' onClick={toggleMode} name='note'> note </button>
                        : <button className='modeButton' onClick={toggleMode} name='list'>
                            List</button>}
                </div>
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

                    {toDoArray.map(ele => {
                        return (this.renderTodoList(ele))
                    })}

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
    
        )

    }
}

export default TodoInput;