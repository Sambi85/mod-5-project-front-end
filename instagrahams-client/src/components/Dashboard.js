import React from 'react';
import { withRouter } from "react-router-dom"

class Dashboard extends React.Component {
    
    clickHandler = (event) => {               
        
        this.props.history.push(`/postform`)
    }
    render() {
          
        return(
        <div className="dashboard">
            <div className="avatar-div">
                <img className="avatar" onClick={this.clickHandler} src={this.props.user.avatar} alt={this.props.user.username}/>
            </div>
            <div className="username">
                <h1>{this.props.user.username}</h1>
            </div>
            <div className="edit">
                <button className="edit-button">Edit</button>
            </div>
            <div className="posts-div">
                Posts: {this.props.user.posts.length}
            </div>
            <div className="followers">
               Followers:{this.props.user.followed_users.length}
            </div>
            <div className="following">
                Following: {this.props.user.following_users.length}
            </div>

            <div className="quote">
                <p>{this.props.user.quote}</p>
            </div>
        </div>   
        )
    }
}
export default withRouter(Dashboard)