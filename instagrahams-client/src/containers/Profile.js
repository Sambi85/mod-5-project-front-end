import React from 'react';
import Dashboard from "../components/Dashboard.js"
import ProfileCard from "../components/cards/ProfileCard.js"
import CommentForm from "../components/forms/CommentForm.js"

class Profile extends React.Component {

postIterator = () => {
    return this.props.posts.map(element => 
    <ProfileCard key={element.id} 
        post={element} 
        likes={this.props.likes} 
        user={this.props.user} 
        patchHandler={this.props.patchHandler} 
        likePostHandler={this.props.likePostHandler} 
        likeDestroyHandler={this.props.likeDestroyHandler}
        targetPostHandler={this.props.targetPostHandler}/>)
}
    
    render() {
        
        return (
            <>
            <div className="container">
                <Dashboard user={this.props.user}/>
            </div>
            <div className="container">
                {this.postIterator()}
            </div>
            </>
        )
    }
}

export default Profile;