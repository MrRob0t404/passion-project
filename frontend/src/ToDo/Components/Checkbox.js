import React, {Component} from 'react';

class Checkbox extends Component {
    constructor() {
        super();
        this.state = {
            isChecked: false
        }
    }
    toggleCheckboxChange = () => {
        const {handleCheckboxChange, label} = this.props;

        this.setState(({isChecked}) => ({
            isChecked: !isChecked
        }));

        handleCheckboxChange(label);
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
                        onChange={this.toggleCheckboxChange}/> {label}
                </label>
            </div>
        );
    }
}

export default Checkbox;