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
            onSubmit,
            handleInput,
            value,
            toDoArray,
            toggleComplete,
            toggleMode,
            handleTextField,
            mode
        } = this.props
        const {textField} = this.state
        console.log('home field:', this.state.textField)
        return (
            <div>
                <div>
                    <form onSubmit={onSubmit}>
                        <input
                            placeholder="Take a Note"
                            type='text'
                            onChange={handleInput}
                            value={value}
                            onClick={this.handleClick}/>
                    </form>
                    <button onClick={toggleMode} name='list' className='mode'>
                        List
                    </button>
                    <button onClick={toggleMode} name='note' className='mode'>
                        Note
                    </button>
                    {textField && mode === 'note'
                        ? <textarea rows="4" onChange={handleTextField} value={value} cols="50"></textarea>
                        : textField && mode === 'list'
                            ? <input type='text'/>
                            : ''}
                </div>
                <div>
                    <div>
                        <ul>
                            {toDoArray.map(element => {
                                return <li onClick={toggleComplete} toggleComplete={toggleComplete}>{element.task}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home