import React from 'react';
import { withRouter } from "react-router-dom"

class ReplyForm extends React.Component {

    state = {
        description: "",
        targetComment: this.props.targetComment
    }

    changeHandler = (event) => {    

    this.setState({
        description: event.target.value
        })
    }

    submitHandler = (event) => {
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
            comment_id: this.state.targetComment.id,
            description: this.state.description,
            date: Date(Date.now())
            })
          }
      
        fetch(`http://localhost:4000/replies`, options)
        .then(response => response.json())
        .then(replyObj => console.log("Created:",replyObj), 
            this.setState({
                description: ""
            })
        )
    }

    render() {
        
        return (
            <div className="reply-form-div">
            <form onSubmit={this.submitHandler}>
                <h1>Make a Reply</h1>
                <input name="description" value={this.state.description} placeholder="reply here" onChange={this.changeHandler}/>
                <button>Post</button>
            </form>
            </div>
        )
    }
}

export default withRouter(ReplyForm)