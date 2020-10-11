import React from 'react';
import FollowerCard from "../components/cards/FollowerCard.js"
import FollowingCard from "../components/cards/FollowingCard.js"

class FollowContainer extends React.Component {

iterateFollowers = () => {

    let filteredArray = this.props.user.followers.map(element => <FollowerCard key={element.id} data={element}/>);

    if (filteredArray.length > 0) {       
        
        return filteredArray
        
    } else {
        
        return " You currently have no followers, but don't worry I think you're awesome !!! "
    }
}

iterateFollowing = () => {
    let leaderIds = this.props.user.leaders.map(element => element.id)
    let followingArray = this.props.posts.filter(element => leaderIds.includes(element.user.id)) 
    
    if (followingArray.length > 0) {       
        
        return followingArray.map(element => <FollowingCard key={element.id} data={element}/>)
    
    } else {
    
        return " whomp whomp, You currently aren't following anyone !!! "
    } 
}
    render() {
        console.log(this.props.users)
        return ( 
            <>
            <div className="follower-div">
            <h1>Your Followers</h1>
                {this.iterateFollowers()}
            </div>
            <div className="following-div">
            <h1>Following User's Posts</h1>
                {this.iterateFollowing()}
            </div>
            </>

        )
    }
}

export default FollowContainer