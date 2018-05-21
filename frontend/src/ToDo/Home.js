import React, {Component} from 'react'

import Style from '../CSS/style.css'

class Home extends Component {
    render() {
        const {
            onSubmitToDoList,
            submitList,
            onSubmitNotes,
            handleTitileInput,
            handleInput,
            value,
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
            textField
        } = this.props

        console.log('noteArray', noteArray)
        return (
            <div id='container'>
                <div id='inputTitle'>
                    {/* renders  title for list */}
                    <input
                        id='titleInputBox'
                        placeholder='Title'
                        type='text'
                        onChange={handleTitileInput}
                        name={mode}
                        value={title}
                        onClick={handleClick}/>

                    <button className='modeButton' onClick={toggleMode} name='list' className='mode'>
                        List
                    </button>
                    <button onClick={toggleMode} name='note' className='mode'>
                        Note
                    </button>

                    {/* either renders input box for to do list or text input field for notes */}
                    {mode === 'list' && textField
                        ? <form onSubmit={onSubmitToDoList}><input
                        id='todoItem'
                                name='task'
                                placeholder='item'
                                type='text'
                                value={task}
                                onKeyPress={handleKeyPress}
                                onChange={handleInput}/></form>
                        : mode === 'note' && textField
                            ? <form onSubmit={onSubmitNotes}>
                                    <textarea
                                    id='noteTextArea'
                                        onChange={handleNoteChange}
                                        value={note}
                                        rows="1"
                                        cols="70"
                                        placeholder='Make a note'></textarea>
                                </form>
                            : ''}

                    <div>
                        {/* iterates through toDoList and renders list on screen */}
                        <ul>
                            {toDoList.map(element => {
                                return <li>{element}</li>
                            })}
                        </ul>
                        <button onClick={submitList}>Done</button>
                    </div>
                </div>
                <div>
                    <div id='itemContainter'>
                        {/* iterates through toDoList and renders each todo list in its own container  */}
                        {toDoArray.map(element => {
                            return (
                                <div className='toDoBlockContainer'>
                                    <h3 id='title'>{element.title}</h3>
                                    <ul className='toDoItem'>{element
                                            .toDoList
                                            .map(ele => {
                                                return <li onClick={toggleComplete}>{ele}</li>
                                            })}
                                    </ul>
                                </div>
                            )
                        })}

                        {/* iterates through noteArray and renders each todo list in its own container  */}
                        {noteArray.map(ele => {
                            console.log('title', ele.title)
                            return (
                                <div className='noteBlock'>
                                    <h3>{ele.title}</h3>
                                    <p>{ele.note}</p>
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