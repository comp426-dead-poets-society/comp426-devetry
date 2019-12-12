import React, { Component } from 'react'
import { } from '../api/publicAPI';
import { createPoem } from '../api/userAPI';

import '../App.scss';

import PropTypes from 'prop-types';
import getRandomWord from '../api/randomWordAPI';

export default class SubmitPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      randomWord: '',
      author: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount(){
    let randomWordApi = await getRandomWord();

    console.log(`${randomWordApi}`);

    console.log(`${Object.keys(this.props.loggedIn)}`)

    this.setState({
      randomWord: randomWordApi,
    })

    if (this.props.loggedIn != 'invalid') {
      this.setState({
        author: this.props.loggedIn.user.name
      })
    }

    console.log(`${this.state.author}`)
  }

  async onSubmit(e) {
    e.preventDefault();

    let user = this.state.author;

    const newPoem = {
      title: e.target.title.value,
      body: e.target.body.value,
      isLive: e.target.isLive.value,
      author: user
    }

    await createPoem(newPoem);

    window.location.reload();

  }


  render() {
    if (this.props.loggedIn == "invalid") {
      return (<div> You're not logged in! </div>)
    }
    return (
      <div class="card">
        <div class="card-content">

          <p class="title">
            Create New Poem
          </p>

          <form class="is-expanded" onSubmit={this.onSubmit}>
            <div class="field is-expanded" className="form-group">
              <label class="label">Title: </label>
              <div class="control is-expanded">
                <input
                  class="input is-expanded"
                  type="text"
                  name="title"
                  placeholder="Title goes here"
                  className="form-control"
                />
              </div>
            </div>

            <div class="field" className="form-group">
              <label class="label">P5.js Embed Link: </label>
              <div class="control is-expanded">

                <textarea
                  class="textarea"
                  className="form-control"
                  name="body"
                  placeholder="Think of something creative. Enter your poem here."
                  rows="10"
                />
              </div>
            </div>

            <div class="field" className="form-check">
              <div class="control">
                <label className="form-check-label" htmlFor="completedCheckbox">
                  <input
                    className="form-check-input"
                    id="isLive"
                    type="checkbox"
                    name="isLive"
                  />
                  Make poem public
                </label>
              </div>
            </div>

            <div class="field" className="form-group">
              <div class="control">
                <button type="submit" class="button is-link">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span class="has-text-centered">
                Here's a random word for inspiration! <br></br>
                <span class="has-text-weight-bold is-uppercase">{this.state.randomWord}</span>
            </span>
          </p>
        </footer>

      </div>
    )
  }

}
