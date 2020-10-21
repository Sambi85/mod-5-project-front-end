import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Card, Icon, Image } from 'semantic-ui-react'

class NavCard extends React.Component {

    state = {
        likeButton: false,
        followButton: false
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
                this.props.likePostHandler(this.props.post.id)                                
                this.setState({ likeButton: !this.state.likeButton})
            
            } else if (this.state.likeButton === true) {
                
            let matchingLikes = this.props.likes.filter(element => element.post.id === this.props.post.id)
            let userLike = matchingLikes.filter(element => element.user.id === this.props.user.id)
            this.props.likeDestroyHandler(userLike)
                this.setState({ 
                    likeButton: !this.state.likeButton
            })
        }    
    }

    followButtonText = (event) => {
        
        if (this.state.followButton === false) {
            return "Follow"
                            
        } else if (this.state.followButton === true) {
            return "UnFollow"                    
        }
    }
                    
    followHandler = () => {
                        
        if (this.state.followButton === false) {
            
            this.props.followPostHandler(this.props.post.user)                                
            this.setState({ followButton: !this.state.followButton})
                
        } else if (this.state.followButton === true) {
            console.log("this.props.follows:",this.props.follows)
            let matchingFollows = this.props.follows.filter(element => element.follower.id === this.props.user.id)
            console.log("matchhingFollows Variable:",matchingFollows)
            let userFollow = matchingFollows.filter(element => element.leader.id === this.props.post.user.id)
            console.log("single followObj:",userFollow)
            
            this.props.followDestroyHandler(userFollow)
            this.setState({ followButton: !this.state.followButton })
        }    
    }
    
    clickListener = (event) => {

       let photoId = this.props.post.id
    //    this.props.followPostHandler(this.props.post)
        this.props.targetPostHandler(this.props.post)
       this.props.history.push(`/profile/${photoId}`)
    }

    render() {
        return (
            <Card>
                <Image onClick={this.clickListener} itemsPerRow={2} color='grey' src={this.props.post.img}  wrapped ui={false}/>
                    <Card.Content>
                        <Card.Description>
                        
                        <h4>{this.props.post.description}</h4>
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <a>
                        <div className="like-div">
                        <Icon name='heart'/>
                            likes: {this.props.post.likes.length}
                        </div>
                        </a>
                        <a>
                        <div className="comment-div">
                        <Icon name='comment outline'/>
                            comments: {this.props.post.comments.length}
                        </div>
                        </a>
                        <a>
                        <div className="date-div">
                            {this.props.post.date}
                        </div>
                        </a>
                        <a>
                            <Button onClick={this.likeHandler}>{this.likeButtonText()}</Button>
                            <Button onClick={this.followHandler}>{this.followButtonText()}</Button>
                        </a>
                </Card.Content>
            </Card>
        )
    }
}

export default withRouter(NavCard)