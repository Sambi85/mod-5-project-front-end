import React from 'react';
import { withRouter } from 'react-router-dom';
import CommentCard from '../components/cards/CommentCard.js';
import CommentForm from "../components/forms/CommentForm.js";
import { Feed, Card, Header, Image } from 'semantic-ui-react';

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
        console.log(this.props.targetPost)
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
            <CommentForm targetPost={this.props.targetPost}/>
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