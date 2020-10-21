import React from 'react';
import UserForm from '../components/forms/UserForm.js'

class Settings extends React.Component {

    render() {
     return (
         <> 
        <div style={{ backgroundImage: `url("https://thumbs-prod.si-cdn.com/YKPihKHsR1h_S6X6hQtidF73rgo=/fit-in/1600x0/filters:focal(1682x268:1683x269)/https://public-media.si-cdn.com/filer/7b/50/7b501c05-920c-43df-b02c-2573eac0b90e/_yongqing_bao_-_wildlife_photographer_of_the_year.jpg")`, backgroundPosition: 'center',
            backgroundSize:'cover', backgroundRepeat:'no-repeat', width:'1450px', height: '800px'
            }}>
        </div>
        <div className="options">
        </div>
        <div className="form-container"> 
            <UserForm current_user={this.props.current_user}/>
        </div>
        </>
        )
    }
}

export default Settings;