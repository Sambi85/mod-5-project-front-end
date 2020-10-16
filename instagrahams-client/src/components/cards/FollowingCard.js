import React from 'react';
import { withRouter } from 'react-router-dom';
import CommentForm from "../forms/CommentForm.js"

class FollowingCard extends React.Component {

    state = {
        likeButton: false
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
        this.props.targetPostHandler(this.props.data)
        this.props.history.push(`/profile/${photoId}`)
    }
    
    render() {
        console.log(this.props.data.id)
        
        return (
            <div className="photo-card">
            <div className="photo-div">
                <img onClick={this.clickListener} src={this.props.data.img} alt=''/>
            </div>
            <div className="description-div">
                <p>{this.props.data.description}</p>
            </div>
            
            <div>
                <span>
                    <div>
                        likes: {this.props.data.likes.length}
                    </div>
                    <div>
                        comments: {this.props.data.comments.length}
                    </div>
                </span>
            </div>
            <div className="card-buttons">
            <button onClick={this.likeHandler}>{this.likeButtonText()}</button>
            </div>
            <div className="date-div">
                {this.props.data.date}
            </div>
            <div className="comments-div">
                <CommentForm/>
            </div>

        </div>
        )
    }
}

export default withRouter(FollowingCard)