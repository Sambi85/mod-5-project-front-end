import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Form, Icon } from 'semantic-ui-react'

class CommentForm extends React.Component {

    state = {
        description: ""
    }


    changeHandler = (event) => {     
        this.setState({
            description: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.commentPostHandler(this.state.description)        
        this.setState({
            description: ''
        })
    }

    render() {
   
        return (
            <div className="comment-form-div">
            <Form onSubmit={this.submitHandler}>
                <Form.Field>
                <input name="description" value={this.state.description} placeholder="Leave a Comment" onChange={this.changeHandler}/>
                <Button inverted color='blue'>Post</Button>
                </Form.Field>
            </Form>
            </div>
        )
    }

}

export default withRouter(CommentForm)