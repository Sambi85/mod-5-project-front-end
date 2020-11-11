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
            <>
            <div style={{ backgroundImage: `url(https://images.unsplash.com/photo-1531951665218-b8b598959072?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)`, backgroundPosition: 'center',
            backgroundSize:'cover', backgroundRepeat:'no-repeat', width:'1450px', height: '800px'
                }}>
                </div>
            
                <div className="reply-form-div" style={{ backgroundColor:"white", opacity:"85%"}}>
                    <Card>        
                    <Form onSubmit={this.submitHandler}>
                        <Form.Field>
                        <label>Reply to a comment</label>
                            <input name="description" value={this.state.description} placeholder="reply here" onChange={this.changeHandler}/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                    </Card>
                </div>
                </>
        )
    }
}

export default withRouter(ReplyForm)