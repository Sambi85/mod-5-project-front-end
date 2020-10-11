import React from 'react';
import NavCard from "../components/cards/NavCard.js"

class Profile extends React.Component {

    iteratePics = () => {
        return this.props.data.map(element => <NavCard key={element.id} data={element}/>)
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