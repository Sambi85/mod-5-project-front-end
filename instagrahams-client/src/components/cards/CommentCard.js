import React from 'react';
import ReplyCard from './ReplyCard.js'
import { withRouter} from "react-router-dom"

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
                    <button onClick={this.myCommentHandler}>Delete</button>  
                <div className="update-div">
                    <form onSubmit={this.submitHandler}>
                        <input name='description' value={this.state.description} placeholder="description" onChange={this.changeHandler}/>
                        <button>Update</button>
                    </form>
                    </div>
                </div>
            )
        }
    }

    render() {

        return (
            <>
                <div className="comment-div">
                    <h2> User Comment </h2>
                    <div className="comment-username">
                        <h4>{this.props.comment.user.username}</h4>
                    </div>
                    <div className="comment-avatar">
                        <img onClick={this.clickHandler}src={this.props.comment.user.avatar} alt="user"/>
                    </div>
                    <div className="comment-description">
                        <p>{this.props.comment.description}</p>
                    </div>
                    <div className="update-delete-buttons">
                        {this.buttonHandler()}
                    </div>
                    <div className="replies">
                        {this.repliesIterator()}
                    </div>
                            
                </div>
            </>
        )
    }
}
export default withRouter(CommentCard)
 