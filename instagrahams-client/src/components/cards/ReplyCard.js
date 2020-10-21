import React from 'react';
import { Button, Feed, Form } from 'semantic-ui-react'


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
                    <Button inverted color='red' onClick={this.myReplyHandler}>Delete</Button>  
                <div className="update-div">
                    <Form onSubmit={this.submitHandler}>
                        <input name='description' value={this.state.description} placeholder="description" onChange={this.changeHandler}/>
                        <Button>Update</Button>
                    </Form>
                    </div>
                </div>
            )
        }
    }
    
    render() {
    
        return (
            <>
                {/* <div className="comment-div">
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
                </div> */}       
                    <Feed>
                        <Feed.Event>
                            <Feed.Label>
                                <img className="avatar" src={this.props.reply.user.avatar} alt="user"/>
                            </Feed.Label>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <a style={{color:"red"}}>{this.props.reply.user.username}</a> posted a reply
                                        <Feed.Date>{this.props.reply.date}</Feed.Date><br/>
                                    </Feed.Summary>
                                <Feed.Meta>
                                {this.props.reply.description}
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </>

        )
    }
}
export default ReplyCard