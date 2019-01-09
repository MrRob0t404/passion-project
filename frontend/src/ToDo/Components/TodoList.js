import React, { Component } from 'react'

import Checkbox from './Checkbox.js'

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            display: ''
        }
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    createCheckBox = label => {
        return (<Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label} />)
    }

    removeList = () => {
        console.log('clicked')
        this.setState({
            display: 'none'
        })
    }
    handleFormSubmit = formSubmitEvent => { //Dont need this
        formSubmitEvent.preventDefault();

        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
    }

    handleChecked = () => {
        this.setState({ checked: true })
    }

    createCheckBoxes = (toDoList) => {
        return toDoList.map(ele => this.createCheckBox(ele))
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
            <div>
                <div
                    id="todoBlock" className={this.state.display}
                    className='listBlock toDoBlockContainer noteTitle container'>
                    <h1 id='title'>{toDoObject.title}</h1>
                    <h2 className="undone noteBody" aria-hidden="true">Not Done</h2>
                    {this.createCheckBoxes(toDoObject.toDoList)
                    }
                    <h2 className="done noteBody" aria-hidden="true">Done</h2>
                    <button onClick={this.removeList}>delete</button>
                </div>
            </div>
        )
    }
}

export default TodoList;