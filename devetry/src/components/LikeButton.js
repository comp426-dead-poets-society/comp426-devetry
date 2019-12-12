import React, { Component, useState } from 'react'
import '../App.scss';
import { likePoem, getNumLikes } from '../api/publicAPI';

export class LikeButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: this.props.likeCount
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        let likes;
        try {
            await likePoem(this.props.poemId);
        }
        catch (error) {
            console.log("Uh oh.");
        }
    }

    handleClick(e) {

        e.preventDefault()

        this.setState((prevState, { count }) => ({
            count: prevState.count + 1
        }));
    }

    render() {
        let likes = this.state.count;
        return (
            <React.Fragment>
                <div class="field">
                    <div class="control">
                        <button class="button is-success is-light is-small" onClick={(e) => {this.handleClick(e)}}
                        >Like!</button> {this.state.count}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LikeButton
