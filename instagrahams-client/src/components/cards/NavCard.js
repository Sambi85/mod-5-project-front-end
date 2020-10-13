import React from 'react';
import { withRouter } from "react-router-dom"

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
       this.props.history.push(`/nav/${photoId}`)
    }

    render() {
        // console.log(this.props.post)
        return (
        <div className="photo">
            <div className="photo">
                <img onClick={this.clickListener}src={this.props.post.img} alt=''/>
            </div>
            <div>
                <p>{this.props.post.description}</p>
            </div>
            
            <div>
                <span>
                    <div>
                        likes: {this.props.post.likes.length}
                    </div>
                    <div>
                        comments: {this.props.post.comments.length}
                    </div>
                </span>
            </div>
            <div className="card-buttons">
                
                <button onClick={this.likeHandler}>{this.likeButtonText()}</button>
                <button onClick={this.followHandler}>{this.followButtonText()}</button>
            </div>
            <div className="date-div">
                {this.props.post.date}
            </div>
            <div className="comments-div">
            </div>

        </div>
        )
    }
}

export default withRouter(NavCard)