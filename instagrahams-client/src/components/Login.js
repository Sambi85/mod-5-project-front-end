import React from 'react';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    
    state = {
        username: '',
        password: ''
    }
  
    changeHandler = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.history.push("/home")
        this.setState({
            [event.target.name]: ''
        })
    }

    render() {
        return (
            <>
            <div className="login-div" style={{"border":"1px solid lightGrey","border-radius":"10px","paddingBottom":"20px"}} >
            <h1 className="instagrahams">Instagrahams</h1>
                <form onSubmit={this.submitHandler}>
                    <input 
                    style={{"marginBottom":"5px", "text-align":"center"}} 
                    type="text" name="username" 
                    value={this.state.username} 
                    placeholder="Username" 
                    onChange={this.changeHandler}/>
                    <br/>
                    <input 
                    style={{"text-align":"center"}} 
                    type="text" 
                    name="password" 
                    value={this.state.password} 
                    placeholder="Password" 
                    onChange={this.changeHandler}/>
                    <br/>
                    <br/>
                    <button style={{"color":"white","background-color": "#008CBA","width":"150px","border-radius":"5px"}}> Log in </button>
                </form>
            </div>
            </>
            
        )
    }

}
export default withRouter(Login)