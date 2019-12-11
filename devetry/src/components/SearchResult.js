import React, { Component } from 'react'

export default class SearchResult extends Component {
    render() {
        return (
            <div className={"box"} key={this.props.poem.id}>
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
        )
    }
}
