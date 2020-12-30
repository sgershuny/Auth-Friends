import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import { css } from "@emotion/core";
import PuffLoader from 'react-spinners/PuffLoader';

import { connect } from 'react-redux';
import { loginRequest } from '../actions/actions';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            credentials: {
                username: '',
                password: ''
            }

        }
    }

    handleChange = e => {

        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    }

    handleLogin = e =>{
        e.preventDefault(); 
        console.log("Login Called!!")
        this.props
            .loginRequest(this.state.credentials)
            .then(() => this.props.history.push("/protected-friends"))
    }


    render(){

        return (
            <div className = "login-card">
            
                
                <Form onSubmit = { this.handleLogin }>
                    <Form.Group 
                        controlId="formBasicEmail" 
                        className = "group"
                        onSubmit = {this.handleLogin}
                    >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter email" 
                            name = "username" 
                            onChange = {this.handleChange}
                        />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className = "group">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            name = "password" 
                            onChange = {this.handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className = "group">
                        {(this.props.isLoggingIn === true) ? 
                            (<PuffLoader size={30} color={"white"} />)
                            :
                            (<h4>Log In</h4>)}                        
                    </Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        isLoggingIn: state.isLoggingIn
    }
}

export default connect(mapStateToProps,{loginRequest})(Login);