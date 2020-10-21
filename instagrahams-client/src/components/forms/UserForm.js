import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Segment  } from "semantic-ui-react";
// import Logo from '../logo.png'

class UserForm extends React.Component {

    state = {
        username: "",
        avatar: "",
        quote: ""
    }

changeHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

submitHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
    
    this.formHandler(this.state)
    
    this.setState({
        username: "",
        avatar: "",
        quote: ""
    })
}

formHandler = (formObj) => {
    let options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
        },
        body: JSON.stringify({
            username: formObj.username,
            avatar: formObj.avatar,
            quote: formObj.quote
        })
    }
    //set patch to this... after auth is setup `http://localhost:4000/users/${this.props.current_user}`
    fetch(`http://localhost:4000/users/1`, options)
    .then(response => response.json())
    .then(formData => console.log(formData))
}

userDestroyer = (event) => {

    window.alert(
        "Are you sure you wanna delete your account ? Hit okay if you're sure!"
    )

    let id = this.props.current_user
    let options = { method: "DELETE" }
    //set patch to this... after auth is setup `http://localhost:4000/users/${this.props.current_user}`
    fetch(`http://localhost:4000/users/2`, options).then(response => response.json()).then(
        // this.props.history.push("/login")
        ) 
}

    render() {
        return (
        // <div className="form-div">
        //     <form onSubmit={this.submitHandler}> 
        //          <h2>Name</h2><input name="username" value={this.state.username} placeholder="update username" onChange={this.changeHandler}/>
        //          <h2>Avatar</h2><input name="avatar"value={this.state.avatar} placeholder="update avatar" onChange={this.changeHandler}/>
        //          <h2>Quote</h2><input name="quote" value={this.state.quote} placeholder="update quote" onChange={this.changeHandler}/>
        //         <button>submit</button>
        //     </form>
        //     <div>
        //         <h2>Delete account</h2>
        //         <button onClick={this.userDestroyer}>Delete</button>
        //     </div>
        // </div>
        
    <div className="login-div" style={{"border":"1px solid lightGrey","border-radius":"10px","paddingBottom":"20px", backgroundColor:"white", opacity:"85%"}} >
        <Form onSubmit={this.submitHandler}>
            <Form.Field className="username">
                <h3>Profile Update</h3>
                <input type="text" value={this.state.username} name="username" placeholder="Username" onChange={this.changeHandler}/>
                <input type="text" value={this.state.avatar} name="avatar" placeholder="Avatar" onChange={this.changeHandler}/>
                <input type="text" value={this.state.quote} name="quote" placeholder="Quote" onChange={this.changeHandler}/>
            </Form.Field>
                <Button type="submit" inverted color="blue">Submit</Button>
                <p>________________________________</p>
                <h4>Delete Profile</h4>
                <Button onClick={this.userDestroyer} inverted color='red'>Delete</Button>
        </Form>

    </div>



        )
    }
}

export default withRouter(UserForm)