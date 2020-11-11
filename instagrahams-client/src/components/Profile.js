import React from 'react';
import Dashboard from "./Dashboard.js"
import ProfileCard from "./cards/ProfileCard.js"
import { Card } from 'semantic-ui-react'

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
        console.log("profile likes:",this.props.likes)
        return (
            <>
            <div className="dashboard-container">
                <Dashboard user={this.props.user}/>
            </div>
            
            <Card.Group className="nav-card-container" itemsPerRow={3}>
                {this.postIterator()}
            </Card.Group>
            </>
        )
    }
}

export default Profile;