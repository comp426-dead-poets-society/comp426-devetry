import React, { Component } from 'react'
import {getPoem} from '../api/publicAPI';
import {getUserPoem, updatePoemBody, updatePoemTitle, updateLive} from '../api/userAPI';

import '../App.scss';

import PropTypes from 'prop-types';

export default class SubmitPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            poemId: undefined,
            title: '',
            body: '',
            author: '',
            createdAt: undefined,
            updatedAt: undefined,
        }
    }

    async componentDidMount() {
        if (this.props.loggedIn != 'invalid') {
            this.setState({
              author: this.props.loggedIn.user.name
            })
        }


        this.setState({ poemId: this.props.match.params.id });
        let poem;
        try {
            if (this.props.user) {
                poem = await getUserPoem(this.props.match.params.id);
             } 
        else {
            poem = await getPoem(this.props.match.params.id);
            }
            
            console.log(`This poem: ${poem.title}`)
            this.setState({
                title: poem.title,
                body: poem.body,
                author: poem.author,
                createdAt: poem.createdAt,
                updatedAt: poem.createdAt,
            });
        } catch (error) {
            console.log(`This poem is ${poem} and does not exist.`)
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        
        const samePoem = {
            title: e.target.title.value,
            body: e.target.body.value,
            isLive: e.target.isLive.value,
        }

        await updatePoemTitle(this.props.match.params.id, samePoem.title);
        await updatePoemBody(this.props.match.params.id, samePoem.body);
        await updateLive(this.props.match.params.id, samePoem.isLive);

    }


    render() {
        return (
            <div class="card">
            <div class="card-content"> 
            <div style={{marginTop: 10}}>
				<h3>Edit Poem</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Title: </label>
						<input 	
                                type="text"
                                name="title"
                                class="input"
                                value={this.state.title}
								/>
					</div>
					<div className="form-group">
						<label>P5.js Embed Link: </label>
						<textarea
                                // className="form-control"
                                class="textarea"
                                name="body"
                                value={this.state.body}
                                placeholder={this.state.body}
								/>	
					</div>

                    <div className="form-check">
                        <input
                                // className="form-check-input"
                                id="isLive"
                                type="checkbox"
                                name="isLive"
                                value={this.state.isLive}
                                class="checkbox"
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Make poem public
                        </label>
                    </div> 

					<div className="form-group">
						<input type="submit" value="Edit Poem" className="btn btn-primary" class="button is-primary" />
					</div>
				</form>
			</div>
            </div>
            </div>
        )
    }
    
}
