import React, { Component, useState} from 'react'
import '../App.scss';
import { likePoem, getNumLikes } from '../api/publicAPI';

export class LikeButton extends Component {
    state = {
        count: this.props.likeCount
    }

    async componentDidMount() {
        let likes;
        try {
            await likePoem(this.props.poemId);
        }
        catch(error){
            console.log("Uh oh.");
        }
    }

    handleClick = () => {
        this.setState((prevState, { count }) => ({
          count: prevState.count + 1
        }));
    }

    //TODO: Need to find a way to dynamically update likes on the page
    render() {
        let likes = this.state.count;
        return (
            <React.Fragment>
                <div>
                    <p>
                        <button onClick={ this.handleClick } className='likeButton'
                        type='button'>Like!</button> {this.state.count}
                    </p>
                </div>
            </React.Fragment>
        )
    }
}

export default LikeButton
