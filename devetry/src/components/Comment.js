import React, { Component } from 'react';
import { getComments, getComment, deleteComment } from '../api/privateAPI';
import '../App.scss';

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: '',
            author: '',
            createdAt: undefined
        }

    }

    async componentDidMount() {
        if (this.props.commentId != 'counter') {
            let commentText = await getComment(this.props.poemId, this.props.commentId)

            console.log(`HELLO! This is the poemid ${this.props.poemId} and this is the commentid ${this.props.commentId}`);
            this.setState({
                body: commentText.body,
                author: commentText.author,
                createdAt: commentText.createdAt
            })
            console.log(`${this.state.body}`);
        }
    }


    //TODO: Add delete functionality
    render() {
        if (this.props.loggedIn.user.name == this.state.author) {
            return (
                <div>
                    <div class="card">
                        <div class="card-content">
                            <p class="subtitle">
                                {this.state.body}
                            </p>
                            
                            <div class="level-left">
                                <p class="level-item">
                                    Posted by <span class="is-italic"> &nbsp;{this.state.author}&nbsp;</span> on {(new Date(this.state.createdAt).toLocaleDateString())}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div class="card">
                    <div class="card-content">
                        <p class="subtitle">
                            {this.state.body}
                        </p>
                        
                        <div class="level-left">
                            <p class="level-item">
                                Posted by <span class="is-italic"> &nbsp;{this.state.author}&nbsp;</span> on {(new Date(this.state.createdAt).toLocaleDateString())}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}