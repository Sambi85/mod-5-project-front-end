import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Card, Form, Image } from 'semantic-ui-react'


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
            user_id: this.props.user.id,
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
        this.props.history.push(`/nav`)
    }

    render() {
        
        return (
            // <div className="reply-form-div">
            // <form onSubmit={this.submitHandler}>
            //     <h1>Make a Reply</h1>
            //     <input name="description" value={this.state.description} placeholder="reply here" onChange={this.changeHandler}/>
            //     <button>Post</button>
            // </form>
            // </div>
                <div className="reply-form-div">
                    <Card>
                    <Image src={'https://i.pinimg.com/originals/c6/0f/f3/c60ff3ae9de0a29c7a418101514cab15.jpg'}
                    syle={{width:"100px"}} wrapped ui={false}/>
                        
                    <Form onSubmit={this.submitHandler}>
                        <Form.Field>
                        <label>Reply to a comment</label>
                            <input name="description" value={this.state.description} placeholder="reply here" onChange={this.changeHandler}/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                    </Card>
                </div>
        )
    }
}

export default withRouter(ReplyForm)