import React from 'react';
import NavCard from "../components/cards/NavCard.js"

class Profile extends React.Component {

    iteratePics = () => {
        return this.props.posts.map(element => 
        <NavCard 
            key={element.id} 
            post={element}
            likes={this.props.likes}
            user={this.props.user}
            follows={this.props.follows}
            likePostHandler={this.props.likePostHandler}
            likeDestroyHandler={this.props.likeDestroyHandler}
            followPostHandler={this.props.followPostHandler}
            followDestroyHandler={this.props.followDestroyHandler}/>)
    }

    render() {
        
        return (    
            <>
            <div className="container">{this.iteratePics()}</div>
            </>
        )
    }
}

export default Profile;