import React, { Component, useState} from 'react'
import '../App.scss';
import { deleteUserPoem } from '../api/userAPI';

export class DeleteButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p>
                        <button onClick={ async () => await deleteUserPoem(this.props.poemId) } className='button is-danger'
                        type='button'>Delete</button>
                    </p>
                </div>
            </React.Fragment>
        )
    }
}

export default DeleteButton
