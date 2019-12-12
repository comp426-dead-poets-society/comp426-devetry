import React, { Component } from 'react'
import { getPoem } from '../api/publicAPI';
import '../App.scss';
import LikeButton from '../components/LikeButton';
import Post from '../components/Post';
import ShowComments from '../components/ShowComments';
import Comment from '../components/Comment';
import { createComment, getComments } from '../api/privateAPI';

export default class PostPage extends Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            commentIds: []
        }
    }


    async componentDidMount() {
        console.log('I was triggered during componentDidMount')
        
        // Pull out the comment ids for the viewed poem
        
        let comments = await getComments(this.props.match.params.id);

        console.log(`COMMENT IDS: ${comments}`)

        this.setState({
            commentIds: Object.keys(comments).slice(0,-1)
        });

        console.log(`COMMENT IDS: ${this.state.commentIds}`)
        
        /*
        try {       

        } catch (error) {
            console.log(`Uh oh.`)
        }
        */
        
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
        
        let commentElements = [];
        for (var commentId in this.state.commentIds){
            if (commentId != 'counter'){
                commentElements.push(<Comment loggedIn={this.props.loggedIn} poemId={this.props.match.params.id} commentId={commentId}/> )
            };
        }     


        //Don't allow users to add comment if not logged in
        console.log(`${Object.keys(this.props)}`);
        if (this.props.loggedIn == 'invalid') {
            return (
                <div class="container">
                    <Post poemId={this.props.match.params.id} />

                    <div class="card">
                        <div class="card-content">
                            <p class="title">
                                Comments
                        </p>
                        </div>
                    </div>
                    <div>
                        {commentElements}
                    </div>
                </div>
            )
        }
        //If logged in, allow users to add comments
        return (
            <div class="container">
                <Post poemId={this.props.match.params.id} />

                <div class="card">
                    <div class="card-content">
                        <p class="title">
                            Comments
                        </p>
                    </div>
                    
                    <div class="card-content">
                        <p class="subtitle">
                            Add your own comment
                        </p>
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

                <div>
                    {commentElements}
                </div>
            </div>
        )
    }
}
