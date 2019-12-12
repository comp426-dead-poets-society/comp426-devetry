import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchResult extends Component {
    render() {
        return (
            <Link to={`/post/${this.props.poem.id}`}>
                <div className={"box"}>
                    <article className={"media"}>
                        <div className={"media-content"}>
                            <div className={"content"}>
                                <p>
                                    <strong>{this.props.poem.title}</strong>
                                    <br />
                                    {this.props.poem.author}
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </Link>
        )
    }
}
