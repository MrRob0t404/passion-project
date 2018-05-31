import React, {Component} from 'react';

class Checkbox extends Component {
    constructor() {
        super();
        this.state = {
            isChecked: false
        }
    }
    toggleCheckboxChange = (e) => {
        const {label} = this.props;
        console.log(this.state.isChecked)
        this.setState({
            isChecked: !this.state.isChecked
        });

        // handleCheckboxChange(label);
    }

    render() {
        const {label} = this.props;
        const {isChecked} = this.state;

        return (
            <div className="checkbox items">
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onClick={this.toggleCheckboxChange}/> {label}
                </label>
            </div>
        );
    }
}

export default Checkbox;