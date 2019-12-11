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

import PropTypes from 'prop-types';

export default class SubmitPage extends Component {
    
    /*
    constructor(props) {

        super(props);

        let propTypes = {
            onChange: PropTypes.func
          };

        return (
          <div className="box has-background-white content" style={{width: '500px'}}>
            <h3 className="has-text-dark">New Todo</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const title = e.target.title.value;
              const body = e.target.body.value;
              const isLive = e.target.isLive.value;
              e.target.title.value = '';
              e.target.body.value = '';
              e.target.isLive.value = false;
              let poem = {
                  title: title,
                  body: body,
                  isLive: isLive,
                  author: "test"
              }
              let poems = (await createPoem(poem));
              if (props.onChange) props.onChange(poems);
            }}>
              <div className="field">
                <input className="input" autoComplete={'off'} placeholder="Title" type="text" name="title"/>
              </div>
              <div className="field">
                <input className="input" placeholder="Body" type="text" name="body"/>
              </div>
              <div className="field">
                <input className="form-check-input" placeholder="Live" type="checkbox" name="isLive"/>
              </div>
              <input className="button is-primary" type="submit" value={"Add"}/>
            </form>
          </div>
        );
      }
      */

    
    constructor(props) {
        super(props);
    }

    async onSubmit(e) {
        e.preventDefault();
        
        const newPoem = {
            title: e.target.title.value,
            body: e.target.body.value,
            isLive: e.target.isLive.value,
            author: "test_author" //TODO: Make this the logged in user
        }

        createPoem(newPoem);

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
                                name="title"
								className="form-control"
								/>
					</div>
					<div className="form-group">
						<label>Body: </label>
						<textarea
                                className="form-control"
                                name="body"
								/>	
					</div>

                    <div className="form-check">
                        <input
                                className="form-check-input"
                                id="isLive"
                                type="checkbox"
                                name="isLive"
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
