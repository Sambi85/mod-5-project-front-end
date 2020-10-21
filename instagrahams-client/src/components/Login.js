import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form } from "semantic-ui-react";
import Logo from '../logo.png'

class Login extends React.Component {
    
    state = {
        username: '',
        password: ''
    }

    loginFetch = (loginObj) => {

        let options = {
           method: 'POST',
           headers: {
               "Content-Type": "application/json",
               "Accepts":"application/json"
           },
           body: JSON.stringify({
                username: loginObj.username.value,
                password: loginObj.password.value
           }) 
        }
        fetch('http://localhost:4000/login', options)
        .then(response => response.json())
        .then(loginData => 
            localStorage.setItem("current_token", loginData.jwt)
            )      
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.loginFetch(event.target)
        this.props.history.push("/home")
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <>
            <div className="login-div" style={{"border":"1px solid lightGrey","border-radius":"10px","paddingBottom":"20px"}} >
            <img className="logo " src={Logo} alt="" width="150px"/>
                <Form onSubmit={this.submitHandler}>
                    <Form.Field className="username">
                        <input type="text" value={this.state.username} name="username" placeholder="Username" onChange={this.changeHandler}/>
                    </Form.Field>
                    <Form.Field className="password">
                        <input type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.changeHandler} />
                    </Form.Field>
                        <Button type="submit">Submit</Button>
                </Form>
            </div>
            </>
            
        )
    }
}
export default withRouter(Login)