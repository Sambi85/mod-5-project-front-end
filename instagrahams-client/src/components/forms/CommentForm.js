import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Form, Icon } from 'semantic-ui-react'

class CommentForm extends React.Component {

    state = {
        comment: "",
    }

    changeHandler = (event) => {     
        this.setState({
            comment: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.commentPostHandler(this.state.comment)        
        this.setState({
            comment: ''
        })
    }

    render() {
   
        return (
            <div className="comment-form-div">
            <Form onSubmit={this.submitHandler}>
                <Form.Field>
                <input name="comment" value={this.state.comment} placeholder="Leave a Comment" onChange={this.changeHandler}/>
                <Button inverted color='blue'>Post</Button>
                </Form.Field>
            </Form>
            </div>
        )
    }

}

export default withRouter(CommentForm)