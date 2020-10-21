import React from 'react';
import NavCard from "../components/cards/NavCard.js"
import { Card } from 'semantic-ui-react'


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
            followDestroyHandler={this.props.followDestroyHandler}
            targetPostHandler={this.props.targetPostHandler}/>)
    }

    render() {
        
        return (    
            <>
            <Card.Group className="nav-card-container" itemsPerRow={3}>
                {this.iteratePics()}
            </Card.Group>
            </>
        )
    }
}

export default Profile;