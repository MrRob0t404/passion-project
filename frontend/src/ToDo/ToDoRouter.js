import React, {Component} from 'react'
import {Link, Switch, Route} from 'react-router-dom'

//inport compnents
import Home from './Home'

class ToDoRouter extends Component {
    constructor() {
        super();
        this.state = {
            mode: 'list', //Default mode
            note: '',
            list: '',
            title:'',
            task: '',
            toDoList: [], 
            toDoArray: []
        }
    }

    // Handles todo list submittion 
    submitList = e => {
        e.preventDefault();
        const {toDoArray, toDoList, task, title} = this.state
        this.setState({
            toDoArray: [
                ...toDoArray, {
                    title: title,
                    toDoList: toDoList,
                    complete: false
                }
            ],
            title: '', 
            task: '', 
            toDoList: []
        }) 
    }

    //Handles notes submission 
    // onSubmitNotes = e => {
    //     e.preventDefault();
    // }

    
    toggleComplete = e => {
        console.log('toggleComplete', 'clicked')
    }
    
    //Sets mode to list or note 
    toggleMode = e => {
        this.setState({mode: e.target.name})
    }
    
    handleKeyPress = e => { 
        if (e.key === 'Enter'){ 
            this.setState({ 
                task : ''
            })
        }
    }
    
    //Handles user input for text input box
    handleInput = e => {
        const {task} = this.state
        console.log(e.target.value)
        this.setState({ 
            task: e.target.value
        })
        
    }
    
    //Handles input for title input box 
    handleTitileInput = e => { 
        this.setState({ 
            title: e.target.value
        })
    }
    
    //Handles user input for text field 
    handleTextField = e => {
        console.log('text input', e.target.name)
    }

    onSubmitToDoList = e => { 
        e.preventDefault();
        const {toDoList,task} = this.state
        this.setState({ 
            toDoList: [...toDoList, task],
            task: '' 
        }) 
    }
    
    renderTodoList = () => {
        const {input, toDoList, mode, task, title, toDoArray} = this.state
        return <Home
            onSubmitToDoList={this.onSubmitToDoList}
            submitList={this.submitList}
            handleTitileInput={this.handleTitileInput}
            handleInput={this.handleInput}
            toDoList={toDoList}
            toDoArray={toDoArray}
            toggleComplete={this.toggleComplete}
            toggleMode={this.toggleMode}
            handleTextField={this.handleInput}
            task={task}
            title={title}
            mode={mode}/>
    }

    render() {
        return (
            <div>
                <div>
                    <nav>
                        <Link to='/'>Home</Link>
                    </nav>
                </div>
                <div>
                    <Switch>
                        <Route exact path='/' component={this.renderTodoList}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ToDoRouter