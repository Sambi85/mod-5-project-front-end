import React from 'react';
import { withRouter } from 'react-router-dom';
import CommentCard from '../components/cards/CommentCard.js';
import CommentForm from "../components/forms/CommentForm.js";
import { Feed, Card, Header, Image } from 'semantic-ui-react';

class PostContainer extends React.Component {

    state = {
        comments: [],
        replies: [],
        targetPost: null
    }

    componentDidMount() {
        this.setState({
            comments: this.props.comments,
            replies: this.props.replies,
            targetPost: this.props.targetPost 
        })
    }

commentPostHandler = (commentObj) => {
        console.log("commentObj:", commentObj)
    let options = {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Accepts": "application/json"
     },
     body: JSON.stringify({
     user_id: this.props.user.id,
     post_id: this.state.targetPost.id,
     description: commentObj,
     date: Date(Date.now())
     })
   }
 
   fetch(`http://localhost:4000/comments`, options)
   .then(response => response.json())
   .then(commentObj => 
     this.setState({
       comments: [commentObj,...this.state.comments]
     }))
     this.props.commentStatePostHandler(this.state.comments)
 }

commentDestroyHandler = (commentObj) => {

    let targetId = commentObj.id
    let options = { method: "DELETE" }
    let newArray = [...this.state.comments]
    let foundIndex = newArray.findIndex(element => element.id === targetId)
    let splicedArray = newArray.splice(foundIndex, 1) 
    
    fetch(`http://localhost:4000/comments/${targetId}`, options)
    .then(response => response.json())
    .then(commentData => console.log(commentData))
    
    this.setState({
        comments: newArray
    })
    this.props.commentStateDestroyHandler(commentObj)
  }

commentsIterator = () => {
    return this.state.comments.map(element => 
        <CommentCard 
            key={element.id} 
            comment={element}
            comments={this.state.comments}
            user={this.props.user}
            replies={this.state.replies}
            commentUpdateHandler={this.props.commentUpdateHandler}
            commentDestroyHandler={this.commentDestroyHandler}
            replyStateUpdateHandler={this.props.replyStateUpdateHandler}
            replyStateDestroyHandler={this.props.replyStateDestroyHandler}
            replyPostHandler={this.props.replyPostHandler}
            targetComment={this.props.targetComment}
            targetCommentHandler={this.props.targetCommentHandler}
            />)
}

    render() {
        console.log("POST CONTAINER:",this.state.comments)
        return (
            <>
            <div className="post-header-div">
            <Header as='h2'>
                <Image src={this.props.targetPost.user.avatar}  size='small' circular/>
                {this.props.targetPost.user.username}      
            </Header>
            <Card
                image={this.props.targetPost.img}
                header= {`Post By: ${this.props.targetPost.user.username}`}
                meta='This is the Post you clicked on'
                description={this.props.targetPost.description}
                size= "large"
            />
            <CommentForm 
                targetPost={this.props.targetPost} 
                current_user={this.props.user}
                commentPostHandler={this.commentPostHandler}
                />
            </div>
            
            <div className="post-feed-div">
                <Feed>
                    {this.commentsIterator()}
                </Feed>
            </div>
            </>
        )
    }
}

export default withRouter(PostContainer)