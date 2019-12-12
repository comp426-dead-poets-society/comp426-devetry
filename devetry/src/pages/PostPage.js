import React, { Component } from 'react'
import { getPoem } from '../api/publicAPI';
import '../App.scss';
import LikeButton from '../components/LikeButton';
import Post from '../components/Post';
import ShowComments from '../components/ShowComments';
import { createComment } from '../api/privateAPI';

export default class PostPage extends Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }


    async onSubmit(e){
        e.preventDefault();

        let user = this.props.match.params.id;

        const newComment = {
            parentId: this.props.match.params.id,
            body: e.target.body.value,
            user: this.props.loggedIn.user.name
        }

        await createComment(newComment);

        window.location.reload();
    }

    render() {
        //Don't allow users to add comment if not logged in
        console.log(`${Object.keys(this.props)}`);
        if (this.props.loggedIn == 'invalid') {
            return (
                <div class="container">
                    <Post poemId={this.props.match.params.id} />

                    <div class="card">
                        <div class="card-content">
                            <p class="subtitle">
                                Comments
                        </p>
                        </div>
                    </div>

                    <ShowComments poemId={this.props.match.params.id} />
                </div>
            )
        }
        //If logged in, allow users to add comment
        return (
            <div class="container">
                <Post poemId={this.props.match.params.id} />

                <div class="card">
                    <div class="card-content">
                        <p class="subtitle">
                            Comments
                        </p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-content">
                        <form onSubmit={this.onSubmit}>
                        <div class="field">
                            <div class="control">
                                <textarea class="textarea" name="body" placeholder="Add comment here." rows="2"></textarea>
                            </div>
                        </div>

                        <div class="control">
                            <button class="button is-link">Post comment</button>
                        </div>
                        </form>
                    </div>
                </div>

                <ShowComments poemId={this.props.match.params.id} />
            </div>
        )
    }
}
