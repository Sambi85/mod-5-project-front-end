import React from 'react';
import Dashboard from "../components/Dashboard.js"
import ProfileCard from "../components/cards/ProfileCard.js"

class Profile extends React.Component {

postIterator = () => {
    return this.props.posts.map(element => <ProfileCard key={element.id} post={element} user={this.props.user} patchHandler={this.props.patchHandler}/>)
}
    
    render() {
        
        return (
            <>
            <div className="container">
                <Dashboard user={this.props.user}/>
            </div>
            <div>
                {this.postIterator()}
            </div>
            </>
        )
    }
}

export default Profile;