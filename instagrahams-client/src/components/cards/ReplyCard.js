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
        let replyDescriptionObj = this.state.description
        this.props.replyUpdateHandler(replyObj, replyDescriptionObj)
        this.setState({
            description: ""
        })
    }

    myReplyHandler = (event) => {
        let replyObj = this.props.reply
         this.props.replyDestroyHandler(replyObj)        
    }
    
    buttonHandler = () => {
        if (this.props.user.id === this.props.reply.user.id) {

            return (

               <div className="my-comment-buttons">
                
                
                <div className="update-div">
                    <Form onSubmit={this.submitHandler}>
                        <input name='description' value={this.state.description} placeholder="description" onChange={this.changeHandler}/>
                        <Button>Update</Button><Button inverted color='red' onClick={this.myReplyHandler}>Delete</Button> 
                    </Form>
                    </div>
                </div>
            )
        }
    }
    
    render() {
    
        return (
            <>  
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
                                {this.buttonHandler()}
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </>
        )
    }
}
export default ReplyCard