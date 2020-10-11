import React from 'react';
import UserForm from '../components/forms/UserForm.js'

class Settings extends React.Component {

    render() {
     return (
         <> 
        <div className="options">
        </div>
        <div className="form-container"> 
        <UserForm current_user={this.props.current_user}/>
        </div>
        </  >
        )
    }
}

export default Settings;