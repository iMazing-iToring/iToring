import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppLogo from '../assets/app_logo.PNG';
import '../styles/header.css';
import AuthButton from './AuthButton';
import { NavLink } from 'react-router-dom';
import axios from 'axios'

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authPnlClassOpen: false,
            userEmail: "",
            userTkn: "",
            userData: "",
            headerUser: ""
        }

    }

    componentDidMount() {
        const token = localStorage.usertoken
        const userEmail = localStorage.email
        this.setState({ userTkn: token })
        this.setState({ userEmail: userEmail }, () => {
            if(token) {
                axios.post('users/getuserinfo', {
                    email: this.state.userEmail
                })
                .then(res => {
                    this.setState({ userData: res.data })
                    this.state.userData.map(user => this.setState({headerUser: user.first_name}))
                })
                .catch(err => {
                    console.error(err)
                })
            } else {
                this.setState({ userTkn: "" })
            }
        })
    }

    render() {
        return (
            <header>
                <Navbar bg="light" className="header">
                    <Navbar.Brand>
                    <img
                        src={AppLogo}
                        width="200"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <NavLink to="/" exact activeClassName="active" className="links nav-link">
                                <span>Начало</span>
                        </NavLink>
                        <NavLink to="/monitoring" activeClassName="active" className="links nav-link">
                                <span>Мониторинг</span>
                        </NavLink>
                        <NavLink to={this.state.userTkn !== "" ? `/profile=${this.state.headerUser}` : "/login"}>
                            <AuthButton btnValue={this.state.userTkn !== "" ? this.state.headerUser : "Вход"}/>
                        </NavLink>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        )
    }
}
