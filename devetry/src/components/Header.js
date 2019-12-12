import React, {Component} from 'react';

import ModalLogin from "./ModalLogin"
import Logout from "./Logout"
import SearchField from './SearchField';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <a className="Home" href="/">Devetry  </a>
                {this.props.loggedIn === 'invalid' ?
                    <ModalLogin />
                    :
                    <>
                        <span className="is-italic is-size-6">Logged in as {this.props.loggedIn.user.name}</span>
                        <a href="/user" className="button">User Page</a>
                    </>
                }
                <Logout />
                <a className="search button is-info" href="/search">Search</a>
            </div>
        );
    }
}

export default Header;