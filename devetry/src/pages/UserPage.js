import React, { Component, useState, useEffect  } from 'react';
import {getAllUserPoems} from "../api/userAPI";
import Post from '../components/Post';
import { getStatus } from "../api/accountAPI"
import Loading from "../components/Loading"



export default class UserPage extends Component {
    // make sure the user is logged in at all
    // make sure the user page we're attempting to access matches the
    // user ID

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
        console.log(this.props.loggedIn);
        let poems;
        try {
            poems = await getAllUserPoems();
            console.log(poems);
            this.setState({
                poemIds: Object.keys(poems)
            });
        } catch (error) {
            console.log(`Uh oh.`)
        }
    }

    render() {
        let postElements = [];
        console.log(this.props.loggedIn);
        if (this.props.loggedIn == undefined) {
            return (<div> You're not logged in! </div>)
        }

        for (var poem in this.state.poemIds){
            postElements.push(<Post poemId={poem} key={poem}/> );
        }        
        // append the poems
        return (
            <div>
                {postElements}
            </div>
        )
    }
}
