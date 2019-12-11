import React, { Component, useState} from 'react'
import '../App.scss';
import { likePoem, getNumLikes } from '../api/publicAPI';

export class LikeButton extends Component {


    //TODO: Need to find a way to dynamically update likes on the page
    render() {
        return (
            <React.Fragment>
                <div>
                    <p>
                        <button onClick={ async () => await likePoem(this.props.poemId) } className='likeButton'
                        type='button'>Like!</button> {this.props.likeCount}
                    </p>
                </div>
            </React.Fragment>
        )
    }
}

export default LikeButton