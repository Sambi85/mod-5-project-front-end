import React from 'react';
import NavCard from "../components/cards/NavCard.js"
import { Card } from 'semantic-ui-react'


class Profile extends React.Component {

    state = {
        follows: this.props.follows,
        posts: [],
        likes: []
    }

    componentDidMount() {
        fetch('http://localhost:4000/likes').then(response => response.json()).then(likeData =>
        this.setState({ likes: likeData }))

        fetch('http://localhost:4000/posts').then(response => response.json()).then(postData =>
        this.setState({ posts: postData }))
    }

    likePostHandler = (postObj) => {
        console.log("PostObj:",postObj)
        console.log("current user id:",this.props.user.id)
            let options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accepts": "application/json"
            },
            body: JSON.stringify({
            post_id: postObj,
            user_id: this.props.user.id,
            counter: 1,
            date: Date(Date.now())
            })
          }
          
          fetch(`http://localhost:4000/likes`, options)
          .then(response => response.json())
          .then(likeObj => {
              let newArray = [likeObj,...this.props.likes]
              this.props.likeStatePostHandler(newArray)
              
      x
            })
    }

    iteratePics = () => {
        return this.state.posts.map(element => 
        <NavCard 
            key={element.id} 
            post={element}
            likes={this.state.likes}
            user={this.props.user}
            follows={this.props.follows}
            likePostHandler={this.likePostHandler}
            likeDestroyHandler={this.props.likeDestroyHandler}
            followPostHandler={this.props.followPostHandler}
            followDestroyHandler={this.props.followDestroyHandler}
            targetPostHandler={this.props.targetPostHandler}/>)
    }

    render() {
        
        return (    
            <>
            <Card.Group className="nav-card-container" itemsPerRow={3}>
                {this.iteratePics()}
            </Card.Group>
            </>
        )
    }
}

export default Profile;