import React from 'react';
import ReplyCard from './ReplyCard.js'
import { withRouter} from "react-router-dom"
import { Feed, Button, Form } from 'semantic-ui-react'

class CommentCard extends React.Component {

    state = {
        description: ""  
    }

    repliesIterator = () => {
        return this.props.replies.map(element => 
            <ReplyCard 
                key={element.id} 
                reply={element}
                user={this.props.user}
                replyUpdateHandler={this.props.replyUpdateHandler}
                replyDestroyHandler={this.props.replyDestroyHandler}
                />)
    }

    clickHandler = (event) => {
        console.log("Reply to Comment:")
        
        let commentId = this.props.comment.id
        this.props.targetCommentHandler(this.props.comment)
        this.props.history.push(`/comment/${commentId}/reply`)
    }

    changeHandler = (event) => {
        console.log(this.state.description)
        this.setState({
            description: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({
            description: event.target.value
        })
        
        let commentObj = this.props.comment
        let descriptionObj = this.state.description
        console.log(commentObj)
        console.log(descriptionObj)

        return this.props.commentUpdateHandler(commentObj, descriptionObj)  
    }

    myCommentHandler = (event) => {
        let commentObj = this.props.comment
        console.log(commentObj)
            return this.props.commentDestroyHandler(commentObj)        
    }
    
    buttonHandler = () => {
        if (this.props.user.id === this.props.comment.user.id) {
            return (
                <div className="my-comment-buttons">
                <div className="update-div">
                    <Form onSubmit={this.submitHandler}>
                        <Form.Field>
                        <input name='description' value={this.state.description} placeholder="Update your comment" onChange={this.changeHandler}/>
                        </Form.Field>
                        <Button>Update</Button><Button onClick={this.myCommentHandler} inverted color='red'> Delete</Button>  
                    </Form>
                    </div>
                </div>
            )
        }
    }

    render() {

        return (
            <>
            <Feed.Event>
                <Feed.Label onClick={this.clickHandler} image={this.props.comment.user.avatar} />
                     <Feed.Content>
                        <Feed.Summary>
                            <a>{this.props.comment.user.username}</a> posted a Comment
                            <Feed.Date>{this.props.comment.date}</Feed.Date>
                        </Feed.Summary>
                            <Feed.Extra text>
                                <p>{this.props.comment.description}</p><br/>
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
 