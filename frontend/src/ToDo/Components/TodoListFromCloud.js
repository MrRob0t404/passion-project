import React, { Component } from 'react'

import Checkbox from './Checkbox.js'

class TodoListFromCloud extends Component {
    constructor() {
        super()
        this.state = {
            class: ''
        }
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    removeList = () => {
        this.setState({
            class: 'none'
        })
    }

    createCheckBox = label => {
        return (<Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label} />)
    }

    // handleFormSubmit = formSubmitEvent => { //Dont need this
    //     formSubmitEvent.preventDefault();

    //     for (const checkbox of this.selectedCheckboxes) {
    //         // console.log(checkbox, 'is selected.');
    //     }
    // }

    handleChecked = () => {
        this.setState({ checked: true })
    }

    createCheckBoxes = (toDoList) => {

        var todo = []
        for (var property in toDoList) {
            if (property !== 'id' && property !== 'title')
                todo.push(property)
        }
        console.log('todo', todo)
        return todo.map(ele => this.createCheckBox(ele))
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

    render() {
        const { toDoObject } = this.props
        console.log('toDoList', toDoObject)
        return (
            <div className={this.state.class}>
                <div id="todoBlock" className='listBlock toDoBlockContainer noteTitle container'>
                    <h1 id='title'>{toDoObject.title}</h1>
                    <h2 className="undone noteBody" aria-hidden="true">Not Done</h2>
                    {
                        this.createCheckBoxes(toDoObject.todo)
                    }
                    <h2 className="done noteBody" aria-hidden="true">Done</h2>
                    <button onClick={this.removeList}>delete</button>
                </div>
            </div>
        )
    }
}

export default TodoListFromCloud;