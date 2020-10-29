import React from 'react';
import ReplyCard from './ReplyCard.js'
import { withRouter} from "react-router-dom"
import { Feed, Button, Form } from 'semantic-ui-react'

class CommentCard extends React.Component {

    state = {
        description: "",
        comment: this.props.comment,
        comments: this.props.comments,
        replies: this.props.replies
    }

    replyUpdateHandler = (replyObj, replyDescriptionObj) => {
  
        let targetId = replyObj.id
        let options = { 
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
            },
            body: JSON.stringify({
              user_id: this.props.user.id,
              comment_id: this.state.comment.id,
              description: replyDescriptionObj,
              date: Date(Date.now())
            })
        }
      
        fetch(`http://localhost:4000/replies/${targetId}`, options)
        .then(response => response.json())
        .then(replyData => { 
            let newArray = [...this.state.replies]
            newArray.splice(newArray.indexOf(replyObj), 1, replyData)
            this.props.replyStateUpdateHandler(newArray)
            this.setState({
                replies: newArray
            })
        })
      }

    replyDestroyHandler = (replyObj) => {

    let targetId = replyObj.id
    let options = { method: "DELETE" }
    let newArray = [...this.state.replies]
    let foundIndex = newArray.findIndex(element => element.id === targetId)
    let splicedArray = newArray.splice(foundIndex, 1) 
  
  fetch(`http://localhost:4000/replies/${targetId}`, options)
  .then(response => response.json())
  .then(replyData => {

        this.props.replyStateDestroyHandler(newArray)
        this.setState({
        replies: newArray
        })
    })
}

    repliesIterator = () => {
        
        let cleanReplies = this.state.replies.filter(element => element !== [])
        let targetReplies = cleanReplies.filter(element => element.comment.id === this.state.comment.id) 
    
        if (this.state.replies.length > 0) {
            return targetReplies.map(element => 
                <ReplyCard 
                key={element.id} 
                reply={element}
                user={this.props.user}
                replyUpdateHandler={this.replyUpdateHandler}
                replyDestroyHandler={this.replyDestroyHandler}
                />)

        } else {
            return null;
        }
    }

    clickHandler = (event) => {
        console.log("Reply to Comment:")
        
        let commentId = this.props.comment.id
        this.props.targetCommentHandler(this.props.comment)
        this.props.history.push(`/comment/${commentId}/reply`)
    }

    changeHandler = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        // this.setState({
        //     description: event.target.value
        // })
        this.props.commentUpdateHandler(this.state.description, this.state.comment)
        
        this.setState({
            description: ""
        })
    }

    myCommentHandler = (event) => {
        let commentObj = this.state.comment
            return this.props.commentDestroyHandler(commentObj)        
    }
    
    buttonHandler = () => {
        if (this.props.user.id === this.state.comment.user.id) {
            return (
                <div className="my-comment-buttons">
                <div className="update-div">
                    <Form onSubmit={this.submitHandler}>
                        <Form.Field>
                        <input name='description' value={this.state.description} placeholder="Update your comment" onChange={this.changeHandler}/>
                        </Form.Field>
                            <Button>Update</Button> <Button onClick={this.myCommentHandler} inverted color='red'> Delete</Button>  
                    </Form>
                    </div>
                </div>
            )
        }
    }

    render() {
        console.log("CommentCard:",this.state.replies)
        return (
            <>  
            <Feed.Event>
                <Feed.Label onClick={this.clickHandler} image={this.state.comment.user.avatar} />
                     <Feed.Content>
                        <Feed.Summary>
                            <a>{this.state.comment.user.username}</a> posted a Comment
                            <Feed.Date>{this.state.comment.date}</Feed.Date>
                        </Feed.Summary>
                            <Feed.Extra text>
                                <p>{this.state.comment.description}</p><br/>
                                    {this.buttonHandler()}
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                    
                    <Feed>
                        {this.repliesIterator()}
                    </Feed>
            </>
        )
    }
}
export default withRouter(CommentCard)
 