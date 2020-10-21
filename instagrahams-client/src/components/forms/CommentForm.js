import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Form, Icon } from 'semantic-ui-react'


class CommentForm extends React.Component {

state = {
    comment: "",
    targetPost: this.props.targetPost
}

changeHandler = (event) => {
    
    this.setState({
        comment: event.target.value
    })
}

submitHandler = (event) => {
    let target = event.target.value
    console.log(target)
    console.log(this.state.comment)
    event.preventDefault()
    
    let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
        user_id: this.state.current_user,
        post_id: this.state.targetPost.id,
        description: this.state.comment,
        date: Date(Date.now())
        })
      }
  
    fetch(`http://localhost:4000/comments`, options)
    .then(response => response.json())
    .then(commentObj => 
        this.setState({
            comment: ""
        })
    )
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