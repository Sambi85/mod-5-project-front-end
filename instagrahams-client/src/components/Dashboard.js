import React from 'react';
import { withRouter } from "react-router-dom"
import { Icon } from 'semantic-ui-react'


class Dashboard extends React.Component {
    
    clickHandler = (event) => {                     
        this.props.history.push(`/postform`)
    }
    
    render() {
          
        return(
                <div className="dasboard-div">
                    <img onClick={this.clickHandler} className="avatar" size='small' circular src={this.props.user.avatar} avatar />
                    <span><h1>{this.props.user.username}</h1></span>
                    <div textAlign='left'><Icon name='comment outline'/> Posts: {this.props.user.posts.length}</div>
                    <div textAlign='left'><Icon name='users'/> Followers: {this.props.user.followed_users.length}</div>
                    <div textAlign='left'><Icon name='blind'/>Following: {this.props.user.following_users.length}</div>
                    <h2>{this.props.user.quote}</h2>
                </div>
         
        )
    }
}
export default withRouter(Dashboard)