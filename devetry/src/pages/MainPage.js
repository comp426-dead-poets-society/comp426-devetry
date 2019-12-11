import React, { Component } from 'react'
import { getAllPublicPoems } from '../api/publicAPI';
import '../App.scss';
import Post from '../components/Post';

export default class MainPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            //numPoems: undefined
            poemIds: undefined
        }
    }

    async componentDidMount() {
        console.log('I was triggered during componentDidMount')
        //this.setState({ poemId: this.props.match.params.id });
        let poems;
        try {
            poems = await getAllPublicPoems();
            delete poems.counter;
            delete poems.public;
            this.setState({
                poemIds: Object.keys(poems)
            });
        } catch (error) {
            console.log(`Uh oh.`)
        }
    }

    render() {
        let postElements = [];
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
