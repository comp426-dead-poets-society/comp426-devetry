import React, { Component, useState, useEffect } from 'react';
import { getAllUserPoems } from "../api/userAPI";
import Post from '../components/Post';
import { getStatus } from "../api/accountAPI"
import Loading from "../components/Loading"
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';

export default class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            color: undefined,
            poemIds: undefined,
        }
    }

    async componentDidMount() {
        console.log('I was triggered during componentDidMount');
        let poems;
        try {
            poems = await getAllUserPoems();
            delete poems.counter
            // console.log(poems)
            this.setState({
                poemIds: Object.keys(poems)
            });
        } catch (error) {
            console.log(`Uh oh.`)
        }
    }

    render() {
        let postElements = [];
        // console.log("RENDER");
        if (this.props.loggedIn == "invalid") {
            return (<div> You're not logged in! </div>)
        }

        for (var poem in this.state.poemIds) {
            postElements.push(<Post poemId={poem} key={poem} user={this.props.loggedIn.user.name} />);
            //edit and delete buttons
            postElements.push(
                <div class="card">
                    <div class="card-content has-text-right" style={{ 'background-color': this.props.loggedIn.user.data.color }}>
                        <nav class="level is-mobile">
                            <div class="level-left">
                               <EditButton class="button level-item" poemId={poem} />
                               <DeleteButton class="button level-item" poemId={poem} />
                            </div>
                        </nav>
                    </div>
                </div>
            )
        }
        // append the poems
        return (
            <div style={{ 'background-color': this.props.loggedIn.user.data.color}}>
                {postElements}
            </div>
        )
    }
}
