import React, { Component, useState, useEffect  } from 'react';
import {getAllUserPoems} from "../api/userAPI";
import Post from '../components/Post';
import { getStatus } from "../api/accountAPI"
import Loading from "../components/Loading"



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
            console.log(poems)
            this.setState({
                poemIds: Object.keys(poems)
            });
        } catch (error) {
            console.log(`Uh oh.`)
        }
    }

    render() {
        let postElements = [];
        console.log("RENDER");
        console.log(this.props.loggedIn.user.name)
        if (this.props.loggedIn == "invalid") {
            return (<div> You're not logged in! </div>)
        }

        for (var poem in this.state.poemIds){
            postElements.push(<Post poemId={poem} key={poem} user={this.props.loggedIn.user.name}/> );
            //edit and delete buttons
        }        
        // append the poems
        return (
            <div style={{'background-color': this.props.loggedIn.user.data.color}}>
                {postElements}
            </div>
        )
    }
}
