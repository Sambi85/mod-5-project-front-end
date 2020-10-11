import React from 'react';
import CommentForm from "../forms/CommentForm.js"
import { withRouter } from "react-router-dom"

class ProfileCard extends React.Component {

    state = {
        likeButton: false
    }

    clickListener = (event) => {
       
        let photoId = this.props.post.id
        this.props.history.push(`/profile/${photoId}`)
     }
     
     editHandler = () => {
         this.props.history.push(`/patchform`)
         console.log(this.props.post.id)
         return this.props.patchHandler(this.props.post.id)
    }

    postDestroyer = () => {
       let id = this.props.post.id
         
    window.alert(
        "Are you sure you wanna delete your post ? Hit okay if you're sure!"
    )

    let options = { method: "DELETE" }
    //set patch to this... after auth is setup `http://localhost:4000/users/${this.props.current_user}`
    fetch(`http://localhost:4000/posts/${id}`, options).then(response => response.json()).then(
        // this.props.history.push("/login")
        ) 
    }

    buttonText = (event) => {
        
        if (this.state.likeButton === false) {
            return "Like"
        
        } else if (this.state.likeButton === true) {
        }   return "Unlike"
    }

    likeHandler = () => {

        if (this.state.likeButton === false) {
        this.setState({
            likeButton: !this.state.likeButton
        })

            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accepts": "application/json"
                },
                body: JSON.stringify({
                    // this.props.current_user
                    post_id: this.props.post.id,
                    user_id: 1,
                    // counter: ++counter,
                    date: Date(Date.now())
                })
            }

            fetch(`http://localhost:4000/likes`, options)
            .then(response => response.json())
            .then(console.log)
    
        } else if (this.state.likeButton === true) {

            let id = 0
            let options = { method: "DELETE" }
            fetch(`http://localhost:4000/likes/${id}`, options).then(response => response.json())
        }
    }
        
    render() {
        return (
        <div className="photo">
            <div className="photo">
                <img onClick={this.clickListener} src={this.props.post.img} alt='' postId={this.props.post.id}/>
            </div>
            <div>
                <p>{this.props.post.description}</p>
            </div>
            
            <div>
                <span>
                    <div>
                        likes: {this.props.user.likes.length}
                    </div>
                    <div>
                        comments: {this.props.user.comments.length}
                    </div>
                </span>
            </div>
            <div className="card-buttons">
                <button onClick={this.likeHandler}>{this.buttonText()}</button>
                <button>comment</button>
                <button onClick={this.editHandler}>Update Post</button>
                <button onClick={this.postDestroyer}>Delete Post</button>
            </div>
            <div className="date-div">
                {this.props.post.date}
            </div>
            <div className="comments-div">
                <CommentForm/>
            </div>

        </div>
        )
    }
}

export default withRouter(ProfileCard)