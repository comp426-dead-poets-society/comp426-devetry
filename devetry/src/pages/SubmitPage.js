import React, { Component } from 'react'
import {} from '../api/publicAPI';
import {createPoem} from '../api/userAPI';

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import '../App.scss';
import Loading from "../components/Loading"
import { getStatus } from "../api/accountAPI"
import Header from '../components/Header'
import MainPage from './MainPage'
import UserPage from './UserPage'
import SearchPage from './SearchPage'
import NotFound from './NotFound'

export default class SubmitPage extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeIsLive = this.onChangeIsLive.bind(this);

        this.state = {
            title: '',
            body: '',
            isLive: false,
            author: 'should_be_username' //TODO: Figure out a way to pass logged in username here (Malik)
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeBody(e) {
        this.setState({
            body: e.target.value
        });
    }

    onChangeIsLive(e) {
        this.setState({
            isLive: !this.state.isLive
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        //console.log(`Form submitted.`);
		//console.log(`Poem Title: ${this.state.title}`);
		//console.log(`Poem Body: ${this.state.body}`);
        //console.log(`Poem isLive: ${this.state.isLive}`);
        
        const newPoem = {
            title: this.state.title,
            body: this.state.body,
            isLive: this.state.isLive,
            author: this.state.author
        }

        //createPoem({title=this.state.title, body=this.state.body, isLive = this.state.isLive, author=this.state.author});

        createPoem(newPoem);

        this.setState({
            title: '',
            body: '',
            isLive: false,
            author: 'should_be_username' //TODO: Figure out a way to pass logged in username here (Malik)
        })
    }


    render() {
        return (
            <div style={{marginTop: 10}}>
				<h3>Create New Poem</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Title: </label>
						<input 	
								type="text"
								className="form-control"
								value={this.state.title}
								onChange={this.onChangeTitle}
								/>
					</div>
					<div className="form-group">
						<label>Body: </label>
						<textarea
								className="form-control"
								value={this.state.body}
								onChange={this.onChangeBody}
								/>	
					</div>

                    <div className="form-check">
                        <input
                                className="form-check-input"
                                id="isLive"
                                type="checkbox"
                                name="isLive"
                                onChange={this.onChangeIsLive}
                                checked={this.state.isLive}
                                value={this.state.isLive}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Make poem public
                        </label>
                    </div> 

					<div className="form-group">
						<input type="submit" value="Create Poem" className="btn btn-primary" />
					</div>
				</form>
			</div>
        )
    }
}
