import React, {Component} from 'react'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            textField: false
        }
    }

    handleClick = () => {
        this.setState({
            textField: !this.state.textField
        })
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
            mode,
            task,
            title,
            handleKeyPress, 
            toDoArray
        } = this.props

        const {textField} = this.state
        console.log('toDoArray', toDoArray)
        return (
            <div>
                <div>
                    {/* renders  title for list */}
                        <input
                            placeholder='Title'
                            type='text'
                            onChange={handleTitileInput}
                            name='title'
                            value={title}
                            onClick={this.handleClick}/>

                    <button onClick={toggleMode} name='list' className='mode'>
                        List
                    </button>
                    <button onClick={toggleMode} name='note' className='mode'>
                        Note
                    </button>

                    {/* either renders input box for to do list or text input field for notes */}
                    {mode === 'list' && textField ? <form onSubmit={onSubmitToDoList}><input name='task' placeholder ='item' type='text' value={task} onKeyPress={handleKeyPress} onChange={handleInput}/></form> : mode === 'note' && textField ? <form onSubmit={onSubmitNotes}><textarea rows="4" cols="50" placeholder='Make a note'></textarea></form> : '' }
                    
                </div>
                <div>
                    <div>
                        {/* iterates through toDoList and renders list on screen */}
                        <ul>
                            {toDoList.map(element => {
                                return <li>{element}</li>
                            })}
                        </ul>
                        <button onClick={submitList}>Done</button>
                    </div>
                    <div>
                        {/* iterates through toDoList and renders each todo list in its own container  */}
                        {toDoArray.map(element => { 
                            return ( 
                                <div className='toDoBlockContainer'> 
                                    <h3 id='title'>{element.title}</h3>
                                    <ul className='toDoItem'>{element.toDoList.map(ele => { 
                                            return <li onClick={toggleComplete}>{ele}</li>
                                        })}
                                    </ul>
                           </div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home