import React, { Component, useState} from 'react'
import '../App.scss';
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';

// on click take me to the edit page
export class EditButton extends Component {

    // redirect = () => {
    //     console.log("CLICK");
    //     let path = "edit";
    //     path.concat(`${this.props.postId}`);
    //     return <Redirect  to={path} />;
    //  }

    render() {
        return (
            <Link to={`/edit/${this.props.poemId}`}>
                <div>
                    <p>
                        <button className='button is-info'
                        type='button'>Edit</button>
                    </p>
                </div>
            </Link>
        )
    }
}

export default EditButton
