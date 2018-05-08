import React, {Component} from 'react'
import ToDoList from './ToDoList'

class Home extends Component {

    // renderToDoList = () => {     return <ToDoList /> }
    handleItem = e => {
        console.log(e.target.value)
    }

    render() {
        const {onSubmit, handleInput, value, toDoArray} = this.props
        console.log(this.props)
        return (
            <div>
                <div>
                    <form onSubmit={onSubmit}>
                        <input type='text' onChange={handleInput} value={value}/>
                    </form>
                </div>
                <div>
                    <div>
                        <ul>
                            {toDoArray.map(element => {
                                return <li onClick={this.handleItem}>{element}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home