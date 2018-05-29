import React, {Component} from 'react'
import axios from 'axios'
import Style from '../.././CSS/style.css'
import Checkbox from './Checkbox'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfToDoObjectArray: [],
            checked: false,
            hardcode: [
                1, 2, 3, 4, 5
            ],
            notes: []
        }
    }

    // componentWillReceiveProps = props => { //Broke the app console.log('component
    // will recieve props') this.setState({listOfToDoObjectArray: props.toDoArray})
    // }
    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    handleChecked = () => {
        this.setState({checked: true})
    }

    toggleCheckbox = label => {
        // console.log('toggleCheckbox', this.selectedCheckboxes)
        if (this.selectedCheckboxes.has(label)) {
            this
                .selectedCheckboxes
                .delete(label);
        } else {
            this
                .selectedCheckboxes
                .add(label);
        }
    }

    createCheckBox = label => {
        return (<Checkbox
            label={label}
            handleCheckboxChange
            ={this.toggleCheckbox}
            key={label}/>)
    }

    handleFormSubmit = formSubmitEvent => { //Dont need this
        formSubmitEvent.preventDefault();

        for (const checkbox of this.selectedCheckboxes) {
            // console.log(checkbox, 'is selected.');
        }
    }

    createCheckBoxes = () => {
        // console.log('createCheckBoxes', this.state.listOfToDoObjectArray)

        return this
            .state
            .hardcode
            .map(this.createCheckBox)
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
            removeBlock,
            textField,
            user
        } = this.props

        // console.log('console log notes: ', noteArray)
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

                    <button
                        className='modeButton'
                        onClick={toggleMode}
                        name='list'
                        className='mode'>
                        List
                    </button>
                    <button onClick={toggleMode} name='note' className='mode'>
                        Note
                    </button>

                    {/* either renders input box for to do list or text input field for notes */}
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
                            ? <textarea
                                    id='noteTextArea'
                                    onChange={handleNoteChange}
                                    value={note}
                                    rows="1"
                                    cols="70"
                                    placeholder='Make a note'></textarea>

                            : ''}

                    <div>
                        {/* iterates through toDoList and renders list on screen  before submission */}
                        <ul>
                            {toDoList.map(element => {
                                return <li>{element}</li>
                            })}
                        </ul>
                        <button type='submit' onClick={submitList}>Done</button>
                    </div>
                </div>
                <div>
                    <div id='itemContainter'>
                        {/* iterates through toDoList and renders each todo list in its own container  */}

                        {toDoArray[0]
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
                            : ''}

                        {/* iterates through noteArray and renders each todo list in its own container  */}
                        {noteArray.map(ele => {

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