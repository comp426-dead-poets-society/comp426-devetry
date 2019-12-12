import React, { Component } from 'react';

import ModalLogin from "./ModalLogin"
import Logout from "./Logout"
import SearchField from './SearchField';

class Header extends Component {
    componentDidMount () {
        const script = document.createElement("script");
    
        script.src = "https://use.fontawesome.com/releases/v5.3.1/js/all.js";
        script.async = true;
    
        document.body.appendChild(script);
    }
    render() {
        return (
            <nav className="Header" class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="http://localhost:3000/">
                        <img src="https://devetry.com/wp-content/uploads/2017/10/logo-opt.png" width="112" height="28"></img>
                    </a>

                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item has-text-weight-bold" href="http://localhost:3000/">
                            Home
                        </a>

                        <a class="navbar-item has-text-weight-bold" href="http://localhost:3000/search">
                            Search
                        </a>

                        <a class="navbar-item has-text-weight-bold" href="http://localhost:3000/submit">
                            Create
                        </a>

                        <a class="navbar-item has-text-weight-bold" href="http://localhost:3000/user">
                            Your poems
                        </a>

                        <div class="navbar-end">
                            <div class="navbar-item is-right">
                                <div class="buttons">
                                    <div className="Header">
                                        {this.props.loggedIn === 'invalid' ?
                                            <ModalLogin />
                                            :
                                            <div class="has-text-centered">

                                                <h3>
                                                    <span class="icon is-small is-left">
                                                        <i class="fas fa-user"></i>
                                                    </span>
                                                    &nbsp; <span class="is-italic">{this.props.loggedIn.user.name}</span>
                                                </h3>
                                                <Logout />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            /*
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
            */
        );
    }
}

export default Header;