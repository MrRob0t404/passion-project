import React, {Component} from 'react'

import Checkbox from './Checkbox.js'

class TodoList extends Component {

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    createCheckBox = label => {
        return (<Checkbox
            label={label}
            /* handleCheckboxChange={this.toggleCheckbox} */
            key={label}/>)
}

    handleFormSubmit = formSubmitEvent => { //Dont need this
        formSubmitEvent.preventDefault();

        for (const checkbox of this.selectedCheckboxes) {
            // console.log(checkbox, 'is selected.');
        }
    }

    // handleChecked = () => {
    //     this.setState({checked: true})
    // }

    createCheckBoxes = (toDoList) => {
        return toDoList.map(ele => this.createCheckBox(ele))
    }

    // toggleCheckbox = label => {
    //     // console.log('toggleCheckbox', this.selectedCheckboxes)
    //     if (this.selectedCheckboxes.has(label)) {
    //         this
    //             .selectedCheckboxes
    //             .delete(label);
    //     } else {
    //         this
    //             .selectedCheckboxes
    //             .add(label);
    //     }
    // }

    render() {
        const {removeBlock, toDoObject} = this.props
        // console.log('toDoList', toDoObject.toDoList)
        return (
            <div>
                <div id="todoBlock" className='listBlock toDoBlockContainer noteTitle container'>
                    <h1 id='title'>{toDoObject.title}</h1>
                    <h2 className="undone noteBody" aria-hidden="true">Not Done</h2>
                    {
                            this.createCheckBoxes(toDoObject.toDoList)
                    }
                    <h2 className="done noteBody" aria-hidden="true">Done</h2>
                    <button onClick={removeBlock}>delete</button>
                </div>
            </div>
        )
    }
}

export default TodoList;