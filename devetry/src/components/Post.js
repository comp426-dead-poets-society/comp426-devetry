import React, { Component, Button, useRef, useState } from 'react'
import { getPoem } from '../api/publicAPI';
import '../App.scss';
import LikeButton from '../components/LikeButton';

export default class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            poemId: undefined,
            title: '',
            body: '',
            author: '',
            createdAt: undefined,
            updatedAt: undefined,
            likeCount: 0
        }
    }


    async componentDidMount() {
        console.log('I was triggered during componentDidMount')
        this.setState({ poemId: this.props.poemId });
        let poem;
        try {
            poem = await getPoem(this.props.poemId);
            console.log(`This poem: ${poem.title}`)
            this.setState({
                title: poem.title,
                body: poem.body,
                author: poem.author,
                createdAt: poem.createdAt,
                updatedAt: poem.createdAt,
                likeCount: poem.likeCount
            });
        } catch (error) {
            console.log(`This poem is ${poem} and does not exist.`)
        }

    }

    render() {
        console.log('I was triggered during render')
        if (this.state.createdAt === undefined) {
            return (<div> 404. Poem does not exist!</div>)
        }
        console.log(`${this.state.shortUrl}`);
        return (
            <div class="card">
                <div class="card-content">
                    <p class="title">
                        {this.state.body}
                    </p>
                    <p class="subtitle">
                        {this.state.author}
                    </p>
                    <p>
                        Created on {(new Date(this.state.createdAt).toDateString())}
                    </p>
                </div>
                <footer class="card-footer">
                    <p class="card-footer-item">
                        <span>
                            Last modified at {(new Date(this.state.updatedAt).toLocaleTimeString())} on {(new Date(this.state.updatedAt).toLocaleDateString())}
                        </span>
                    </p>
                    <p class="card-footer-item">
                        <span>
                            <LikeButton poemId={this.state.poemId} likeCount={this.state.likeCount} />
                        </span>
                    </p>
                    <p class="card-footer-item">
                        <div>
                            <form>
                                <textarea
                                    value={this.state.shortUrl}
                                />
                            </form>
                        </div>
                    </p>
                </footer>
            </div>
        )
    }
}