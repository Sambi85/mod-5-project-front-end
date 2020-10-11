import React from 'react';

class FollowerCard extends React.Component {

    render() {
        
        return (
            <div className="follow-div-card">
                <img src={this.props.data.avatar} alt=""/>
        <p>{this.props.data.username}</p>
            </div>
        )
    }
}

export default FollowerCard;