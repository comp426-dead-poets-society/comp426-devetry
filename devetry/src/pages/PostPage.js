import React, { Component } from 'react'
import {getPoem} from '../api/publicAPI';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import '../App.scss';
import Loading from "../components/Loading"
import { getStatus } from "../api/accountAPI"
import Header from '../components/Header'
import MainPage from './MainPage'
import UserPage from './UserPage'
import SearchPage from './SearchPage'
import NotFound from './NotFound'
import SubmitPage from './SubmitPage'

export default class PostPage extends Component {

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

    componentDidMount() {
        this.setState({ poemId: this.props.match.params.id});
        try {
            //TODO: Set poem state with values from grabbed poem
            //poem = getPoem(this.props.match.params.id);
        } catch (error) {
            return <div> 404. Poem does not exist!</div>
        }
        

    }

    render() {
        return (
            <div>
                <p>{this.state.poemId}</p>
            </div>
        )
    }
}
