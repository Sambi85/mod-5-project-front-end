import React from 'react';
import FollowContainer from "./FollowContainer.js"
import { withRouter } from "react-router-dom"

class Homepage extends React.Component {
    render() {
    
        return (
            <>
            <div className="follow-container">
               <FollowContainer 
                user={this.props.user} 
                likes={this.props.likes} 
                follows={this.props.follows} 
                posts={this.props.posts}
                likePostHandler={this.props.likePostHandler}
                likeDestroyHandler={this.props.likeDestroyHandler}
                targetPostHandler={this.props.targetPostHandler}
                />
            </div>
           
            <div className="suggestion-container">
            
            </div>
            
            </>
        )
    }
}

export default withRouter(Homepage);