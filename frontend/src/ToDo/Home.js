import React, {Component} from 'react'

import Style from '../CSS/style.css'
import Checkbox from './Components/Checkbox'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfToDoObjectArray: [],
            checked: false
        }
    }

    componentWillReceiveProps = props => { //Broke the app
        console.log('component will recieve props')
        this.setState({listOfToDoObjectArray: props.toDoArray})
    }
    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    handleChecked = () => {
        this.setState({checked: true})
    }

    toggleCheckbox = label => {
        console.log('toggleCheckbox', this.selectedCheckboxes)
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
            console.log(checkbox, 'is selected.');
        }
    }

    createCheckBoxes = () => {
        console.log('createCheckBoxes', this.state.listOfToDoObjectArray)
        return this
            .state
            .listOfToDoObjectArray
            .toDoList
            .map(this.createCheckBox)
    }

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
            removeBlock,
            textField
        } = this.props

        // console.log('noteArray', toDoArray)
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
                        ? <form onSubmit={onSubmitToDoList}><input
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

                        {toDoArray.map(element => {
                            return (
                                <div className='toDoBlockContainer container'>
                                    <h1 id='title'>{element.title}</h1>
                                    <h2 className="undone" aria-hidden="true">Not Done</h2>
                                    {this.createCheckBoxes()}

                                    <h2 className="done" aria-hidden="true">Done</h2>

                                    <button onClick={removeBlock}>delete</button>
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

{/* <div class="container">
  <h1>Will's Summer To-Do List</h1>
  <div class="items">
    <input id="item1" type="checkbox" checked>
    <label for="item1">Create a to-do list</label>

    <input id="item2" type="checkbox">
    <label for="item2">Take down Christmas tree</label>

    <input id="item3" type="checkbox">
    <label for="item3">Learn Ember.js</label>

    <input id="item4" type="checkbox">
    <label for="item4">Binge watch every episode of MacGyver</label>

    <input id="item5" type="checkbox">
    <label for="item5">Alphabetize everything in the fridge</label>

    <input id="item6" type="checkbox">
    <label for="item6">Do 10 pull-ups without dropping</label>

    <h2 class="done" aria-hidden="true">Done</h2>
    <h2 class="undone" aria-hidden="true">Not Done</h2>
  </div>
</div> */
}
