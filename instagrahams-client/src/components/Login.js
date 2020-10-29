import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form } from "semantic-ui-react";
import Campfire from "../Campfire.jpg";
import Logo from '../logo.png'

class Login extends React.Component {
    
    state = {
        username: '',
        password: ''
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.loginFetch(this.state)
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <>
            <div style={{ backgroundImage: `url("https://hdwallsource.com/img/2014/10/awesome-night-wallpaper-28038-28761-hd-wallpapers.jpg")`, backgroundPosition: 'center',
  backgroundSize:'cover', backgroundRepeat:'no-repeat', width:'1450px', height: '800px'
      }}>
      </div>

            <div className="login-div" style={{"border":"1px solid lightGrey","border-radius":"10px","paddingBottom":"20px", backgroundColor:"white", opacity:"85%"}} >
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