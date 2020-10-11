import React from 'react';
import FollowContainer from "./FollowContainer.js"

class Homepage extends React.Component {
    render() {
        // console.log(this.props.data)
        return (
            <>
            <div className="follow-container">
               <FollowContainer user={this.props.user} users={this.props.users} posts={this.props.posts}/>
            </div>
           
            <div className="suggestion-container">
            
            </div>
            
            </>
        )
    }
}

export default Homepage;