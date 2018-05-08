import React, {Component} from 'react'

class Home extends Component {
    render() {
        const {onSubmit, handleInput, value} = this.props
        return (
            <form onSubmit={onSubmit}>
                <input type='text' onChange={handleInput} value={value}/>
            </form>
        )
    }
}

export default Home