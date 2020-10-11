import React from 'react';
import CommentForm from "../forms/CommentForm.js"

class FollowingCard extends React.Component {
    
    render() {
        
        return (
            <div className="photo-card">
            <div className="photo-div">
                <img src={this.props.data.img} alt=''/>
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
                <button>like</button>
                <button>comment</button>
                <button>save</button>
                <button>follow</button>
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

export default FollowingCard