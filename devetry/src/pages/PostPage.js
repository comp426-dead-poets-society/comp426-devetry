import React, { Component } from 'react'
import { getPoem } from '../api/publicAPI';
import '../App.scss';
import LikeButton from '../components/LikeButton';
import Post from '../components/Post';
import ShowComments from '../components/ShowComments';

export default class PostPage extends Component {

    render() {
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
}
