import React from 'react';
import FollowContainer from "./FollowContainer.js"

class Homepage extends React.Component {
    render() {
        // console.log(this.props.data)
        return (
            <>
            <div className="follow-container">
               <FollowContainer 
                user={this.props.user} 
                users={this.props.users}
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

export default Homepage;