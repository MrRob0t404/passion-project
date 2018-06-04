import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

import Style from '../.././CSS/style.css'

export default class ModalBlock extends Component {
    state = {
        open: false
    };

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    render() {
        console.log('props', this.props)
        const {open} = this.state;
        const {removeBlock, title, note} = this.props;
        return (
            <div>
                <div onClick={this.onOpenModal}>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <h3 className='noteTitle'>{title}</h3>
                        <p className='noteBody'>{note}</p>
                        <button className='deleteButton' onClick={removeBlock} value={title}>delete</button>
                    </Modal>
                </div>
            </div>
        );
    }
}
