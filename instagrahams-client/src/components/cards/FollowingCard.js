import React from 'react';
import { withRouter } from 'react-router-dom';
import CommentForm from "../forms/CommentForm.js"
import { Button, Card, Icon, Image } from 'semantic-ui-react'


class FollowingCard extends React.Component {

    state = {
        likeButton: false,
        targetPost: this.props.data
    }

    likeButtonText = (event) => {
        
        if (this.state.likeButton === false) {
            return "Like"
                        
        } else if (this.state.likeButton === true) {
            return "Unlike"                    
        }
    }
                
    likeHandler = () => {
                    
            if (this.state.likeButton === false) {
                this.props.likePostHandler(this.props.data.id)                                
                this.setState({ likeButton: !this.state.likeButton})
            
            } else if (this.state.likeButton === true) {
                let matchingLikes = this.props.likes.filter(element => element.post.id === this.props.data.id)
                let userLike = matchingLikes.filter(element => element.user.id === this.props.user.id)
                    
            this.props.likeDestroyHandler(userLike)
                this.setState({ 
                    likeButton: !this.state.likeButton
            })
        }    
    }

    clickListener = (event) => {
         
       let photoId = this.props.data.id
        this.props.targetPostHandler(this.state.targetPost)
        this.props.history.push(`/profile/${photoId}`)
    }
    
    render() {
        
        return (
            <Card>
            <Image onClick={this.clickListener} src={this.props.data.img} alt='' wrapped ui={false}/>
            <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
                <span className='date'>{this.props.data.date}</span>
            </Card.Meta>
            <Card.Description>
                {this.props.data.description}
            </Card.Description>
                <div>
                <Icon name='like'/>likes: {this.props.data.likes.length}
                </div>
                <div>
                    <Icon name='comment outline'/>comments: {this.props.data.comments.length}
                </div>
            </Card.Content>
            </Card>

        )
    }
}

export default withRouter(FollowingCard)