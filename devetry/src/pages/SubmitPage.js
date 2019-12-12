import React, { Component } from 'react'
import { } from '../api/publicAPI';
import { createPoem } from '../api/userAPI';

import '../App.scss';

import PropTypes from 'prop-types';
import getRandomWord from '../api/randomWordAPI';

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
    this.state = {
      randomWord: ''
    }
  }

  async componentDidMount(){
    let randomWordApi = await getRandomWord();

    console.log(`${randomWordApi}`);

    this.setState({
      randomWord: randomWordApi
    })
  }

  async onSubmit(e) {
    e.preventDefault();

    const newPoem = {
      title: e.target.title.value,
      body: e.target.body.value,
      isLive: e.target.isLive.value,
      author: "test_author" //TODO: Make this the logged in user
    }

    await createPoem(newPoem);

    window.location.reload();

  }


  render() {
    return (
      <div class="card">
        <div class="card-content">

          <p class="title">
            Create New Poem
          </p>

          <form onSubmit={this.onSubmit}>
            <div class="field" className="form-group">
              <label class="label">Title: </label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="title"
                  placeholder="Title goes here"
                  className="form-control"
                />
              </div>
            </div>

            <div class="field" className="form-group">
              <label class="label">Body: </label>
              <div class="control">
                <textarea
                  class="textarea"
                  className="form-control"
                  name="body"
                  placeholder="Think of something creative. Enter your poem here."
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
