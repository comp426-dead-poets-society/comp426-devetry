import React, { Component } from 'react';
import { getComments, getComment } from '../api/privateAPI';
import '../App.scss';

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    async componentDidMount() {

        let commentText = await getComment(this.props.poemId, this.props.commentId)
        this.setState({
            text: commentText
        })
    }

    render() {
        return (
            <div>
                <div class="card">
                    <div class="card-content">
                        <p class="subtitle">
                            {this.state.text}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}