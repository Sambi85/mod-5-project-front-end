import React from 'react';
import { withRouter } from "react-router-dom"

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
        // this.props.current_user
        user_id: 1,
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
            <form onSubmit={this.submitHandler}>
            <h1>Leave a Comment</h1>
                <input name="comment" value={this.state.comment} placeholder="comment here" onChange={this.changeHandler}/>
                <button>Post</button>
            </form>
            </div>
        )
    }

}

export default withRouter(CommentForm)