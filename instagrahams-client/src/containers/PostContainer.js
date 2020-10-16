import React from 'react';
import { withRouter } from 'react-router-dom';
import CommentCard from '../components/cards/CommentCard.js';
import CommentForm from "../components/forms/CommentForm.js"

class PostContainer extends React.Component {

commentsIterator = () => {
    return this.props.comments.map(element => 
        <CommentCard 
            key={element.id} 
            comment={element}
            user={this.props.user}
            replies={this.props.replies}
            commentUpdateHandler={this.props.commentUpdateHandler}
            commentDestroyHandler={this.props.commentDestroyHandler}
            replyUpdateHandler={this.props.replyUpdateHandler}
            replyDestroyHandler={this.props.replyDestroyHandler}
            targetComment={this.props.targetComment}
            targetCommentHandler={this.props.targetCommentHandler}
            />)
}

    render() {
        
        return (
            <>
            <div className="user-div">
                <h3>User's Post you clicked on !</h3>
                  <h1><img src={this.props.targetPost.img} alt="user's post"/></h1>
            </div>
                <CommentForm targetPost={this.props.targetPost}/>
            <div className="photo-div">
        <h3> {`Post By: ${this.props.targetPost.user.username}`}</h3>
                  <img className="avatar" src={this.props.targetPost.user.avatar} alt="avatar"/>             
            </div>

              <div className="comments-iterator-div">
                {this.commentsIterator()}
                
              </div>
            </>
        )
    }
}

export default withRouter(PostContainer)