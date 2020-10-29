import React from 'react';
import FollowerCard from "../components/cards/FollowerCard.js"
import FollowingCard from "../components/cards/FollowingCard.js"
import { Card } from 'semantic-ui-react'

class FollowContainer extends React.Component {

    state = {
        followers: [],
        leaders: [],
    }

    componentDidMount() {
        fetch('http://localhost:4000/users/' + this.props.user.id)
        .then(response => response.json())
        .then(userData => {
            this.setState({
                followers: userData.followers,
                leaders: userData.leaders
            })
        })
    }

iterateFollowers = () => {
    let filteredArray = this.state.followers.map(element => <FollowerCard key={element.id} data={element}/>);

    if (filteredArray.length > 0) {               
        return filteredArray
        
    } else {
        return " You currently have no followers, but don't worry I think you're awesome !!! "
    }
}

iterateFollowing = () => {
    let leaderIds = this.state.leaders.map(element => element.id)
    let followingArray = this.props.posts.filter(element => leaderIds.includes(element.user.id)) 
    
    if (followingArray.length > 0) {       
        
        return followingArray.map(element => 
            <FollowingCard 
                key={element.id} 
                data={element}
                user={this.props.user}
                likes={this.props.likes} 
                follows={this.props.follows}
                posts={this.props.posts}
                likePostHandler={this.props.likePostHandler}
                likeDestroyHandler={this.props.likeDestroyHandler}
                targetPostHandler={this.props.targetPostHandler}
                />)
    
    } else {
    
        return " You currently aren't following anyone !"
    } 
}
    render() {
        return ( 
            <>
            { this.props.user ?  
            <>
            <div className="follower-div">
            <h1>Your Followers</h1>
            <Card.Group itemsPerRow={4}>
                {this.iterateFollowers()}
            </Card.Group>
            </div>

            <div className="following-div">
            <h1>Posts your following</h1>
            <Card.Group itemsPerRow={3}>
                {this.iterateFollowing()}
            </Card.Group>
            </div>
            </>
            :null}
            </>
        )
    }
}

export default FollowContainer