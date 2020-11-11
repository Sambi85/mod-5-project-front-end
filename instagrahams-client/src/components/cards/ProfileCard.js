import React from 'react';
import { withRouter } from "react-router-dom"
import { Card, Image, Icon, Button, Segment } from 'semantic-ui-react'

class ProfileCard extends React.Component {

    state = {
        likeButton: false
    }

    clickListener = (event) => {
       
        let photoId = this.props.post.id
        this.props.targetPostHandler(this.props.post)
        this.props.history.push(`/profile/${photoId}`)
    }
    
    editHandler = () => {
        this.props.history.push(`/patchform`)
        console.log(this.props.post.id)
        return this.props.patchHandler(this.props.post.id)
    }
    
    postDestroyer = () => {
        let id = this.props.post.id
        
        window.alert(
            "Are you sure you wanna delete your post ? Hit okay if you're sure!"
            )
            
        let options = { method: "DELETE" }
            //set patch to this... after auth is setup `http://localhost:4000/users/${this.props.current_user}`
        fetch(`http://localhost:4000/posts/${id}`, options).then(response => response.json()).then(
                // this.props.history.push("/login")
        ) 
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
        
    render() {
        console.log("profile card likes:",this.props.likes)
        return (
    
            <Card>
                <Image onClick={this.clickListener} itemsPerRow={2} color='grey' src={this.props.post.img} alt='' postId={this.props.post.id} wrapped ui={false}/>
                    <Card.Content>
                        <Card.Description>
                        
                        <h4>{this.props.post.description}}</h4>
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <a>
                        <div className="like-div">
                        <Icon name='heart'/>
                            likes: {this.props.user.likes.length}
                        </div>
                        </a>
                        <a>
                        <div className="comment-div">
                        <Icon name='comment outline'/>
                            comments: {this.props.user.comments.length}
                        </div>
                        </a>
                        <a>
                        <div className="date-div">
                        {this.props.post.date}
                        </div>
                        </a>
                        <a>
                        <div className="card-buttons">
                        <Button onClick={this.likeHandler}>{this.likeButtonText()}</Button>
                        <Button onClick={this.editHandler}>Update Post</Button>
                        <Button inverted color='red' onClick={this.postDestroyer}>Delete</Button>
                       </div>
                        </a>
                </Card.Content>
            </Card>

        )
    }
}

export default withRouter(ProfileCard)