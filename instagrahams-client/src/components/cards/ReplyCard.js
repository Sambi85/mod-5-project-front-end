import React from 'react';

class ReplyCard extends React.Component {

    state = {
        description: ""  
    }

    changeHandler = (event) => {
        console.log(this.state.description)
        this.setState({
            description: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({
            description: event.target.value
        })
        
        let replyObj = this.props.reply
        let descriptionObj = this.state.description
        return this.props.replyUpdateHandler(replyObj, descriptionObj)  
    }

    myReplyHandler = (event) => {
        let replyObj = this.props.reply
            return this.props.replyDestroyHandler(replyObj)        
    }
    
    buttonHandler = () => {
        if (this.props.user.id === this.props.reply.user.id) {
            return (
                <div className="my-comment-buttons">
                    <button onClick={this.myReplyHandler}>Delete</button>  
                <div className="update-div">
                    <form onSubmit={this.submitHandler}>
                        <input name='description' value={this.state.description} placeholder="description" onChange={this.changeHandler}/>
                        <button>Update</button>
                    </form>
                    </div>
                </div>
            )
        }
    }
    
    render() {
    
        return (
            <>
                <div className="comment-div">
                    <h2 style={{"color":"red"}}> ####  User Replies #### </h2>
                    <div className="comment-username">
                        <h4>{this.props.reply.user.username}</h4>
                    </div>
                    <div className="comment-avatar">
                        <img className="avatar" src={this.props.reply.user.avatar} alt="user"/>
                    </div>
                    <div className="comment-description">
                        <p>{this.props.reply.description}</p>
                    </div>
                    <div className="update-delete-buttons">
                        {this.buttonHandler()}
                    </div>
                </div>
            </>
        )
    }
}
export default ReplyCard