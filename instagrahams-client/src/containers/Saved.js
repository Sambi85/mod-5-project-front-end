import React from 'react';
import Profilecard from "../components/Profilecard.js"
import Navcard from "../components/Navcard.js"

class Profile extends React.Component {
    
    render() {
        return (
            <>
            <div className="container">
            <Profilecard key={this.props.user.id} user={this.props.user}/>
            </div>
            <div>
                <p>Only you can see what you've saved !</p>
                {/* <Navcard/> */}
            </div>
            </>
        )
    }
}


export default Profile;