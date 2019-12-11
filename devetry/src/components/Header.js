import React, {Component} from 'react';

import ModalLogin from "./ModalLogin"
import Logout from "./Logout"

class Header extends Component {
    render() {
        return (
            <div className="Header">
                {this.props.loggedIn === 'invalid' ?
                    <ModalLogin />
                    :
                    <h3>
                        <span className="is-italic is-size-6">Logged in as</span> {this.props.loggedIn.user.name}
                    </h3>
                }
                <Logout />
            </div>
        );
    }
}

export default Header;