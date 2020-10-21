import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HeaderComp from './components/HeaderComp.js';
import HomePage from "./containers/Homepage.js"
import Profile from "./components/Profile.js";
import Nav from "./containers/Nav.js";
import Settings from "./containers/Settings.js";
import PostContainer from "./containers/PostContainer.js";
import PostForm from "./components/forms/PostForm.js";
import PatchForm from "./components/forms/PatchForm.js";
import CommentForm from "./components/forms/CommentForm.js";
import ReplyForm from "./components/forms/ReplyForm.js"
import Login  from "./components/Login.js"

class App extends React.Component {

  state = {
    current_user: null,
    users: [],
    posts: [],
    likes: [],
    follows: [],
    comments: [],
    replies: [],
    postPatch: [],
    targetPost: [],
    targetComment: []
  }

  componentDidMount(){
    const token = localStorage.getItem("current_token")
    let options = {
            method: 'GET',
           headers: {
            Authorization: `Bearer ${token}`
           }
        }
    if (token) {

      fetch('http://localhost:4000/profile', options).then(response => response.json()).then(userData =>
          this.setState({ current_user: userData.user }))

      fetch('http://localhost:4000/posts').then(response => response.json()).then(postData =>
          this.setState({ posts: postData }))

      fetch('http://localhost:4000/follows').then(response => response.json()).then(followData =>
          this.setState({ follows: followData }))

      fetch('http://localhost:4000/likes').then(response => response.json()).then(likeData =>
          this.setState({ likes: likeData }))
    
      fetch('http://localhost:4000/comments').then(response => response.json()).then(commentData =>
          this.setState({ comments: commentData }))
          
      fetch('http://localhost:4000/replies').then(response => response.json()).then(replyData =>
          this.setState({ replies: replyData }))
    } 
  }

  profilePatchHandler = (patchObj) => {
    this.setState({
      postPatch: patchObj
    })
  }

  likePostHandler = (postObj) => {
    console.log("PostObj:",postObj)
    console.log(this.state.current_user)
        let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
        post_id: postObj,
        user_id: this.state.current_user.id,
        counter: 1,
        date: Date(Date.now())
        })
      }

    fetch(`http://localhost:4000/likes`, options)
    .then(response => response.json())
    .then(likeObj =>
        this.setState({
          likes: [...this.state.likes, likeObj]
      })
    )
}

likeDestroyHandler = (likeObj) => {
  
  let targetId = likeObj[0].id
  let options = { method: "DELETE" }
  let newArray = [...this.state.likes]
  let foundIndex = newArray.findIndex(element => element.id === targetId)
    newArray.splice(foundIndex, 1)

  fetch(`http://localhost:4000/likes/${targetId}`, options)
  .then(response => response.json())
  .then(data => console.log("This should be empty",data),
    
    this.setState({
      likes: newArray
    })
  )
}

followPostHandler = (leaderObj) => {
      
      let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
      leader_id: leaderObj.id,
      follower_id: this.state.current_user.id,
      date: Date(Date.now())
      })
    }

  fetch(`http://localhost:4000/follows`, options)
  .then(response => response.json())
  .then(followObj => 
      this.setState({
        follows: [...this.state.follows, followObj]
    })
  )
}

followDestroyHandler = (followObj) => {

  let targetId = followObj[0].id
  let options = { method: "DELETE" }
  let newArray = [...this.state.follows]
  let foundIndex = newArray.findIndex(element => element.id === targetId)
  let splicedArray = newArray.splice(foundIndex, 1) 
  
  fetch(`http://localhost:4000/follows/${targetId}`, options)
  .then(response => response.json())
  .then(
    this.setState({
      follows: newArray
    })
  )
}

targetPostHandler = (postObj) => {
  this.setState({
    targetPost: postObj
  })
}

commentUpdateHandler = (commentObj, descriptionObj) => {
  
  let targetId = commentObj.id
  let options = { 
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
      },
      body: JSON.stringify({
      user_id: this.state.current_user.id,
      post_id: commentObj.post.id,
      description: descriptionObj,
      date: Date(Date.now())
      })
  }

  fetch(`http://localhost:4000/comments/${targetId}`, options)
  .then(response => response.json())
  .then(commentData =>
      this.setState({
        comments: [...this.state.comments, commentData]
    })
  )
}

  commentDestroyHandler = (commentObj) => {

  let targetId = commentObj.id
  let options = { method: "DELETE" }
  let newArray = [...this.state.comments]
  let foundIndex = newArray.findIndex(element => element.id === targetId)
  let splicedArray = newArray.splice(foundIndex, 1) 
  
  fetch(`http://localhost:4000/comments/${targetId}`, options)
  .then(response => response.json())
  .then(commentData => console.log(commentData),
    this.setState({
      follows: newArray
    })
  )
}

targetCommentHandler = (commentObj) => {
  this.setState({
    targetComment: commentObj
  })
}

replyUpdateHandler = (replyObj, descriptionObj) => {
  
  let targetId = replyObj.id
  let options = { 
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.current_user.id,
        comment_id: replyObj.comment.id,
        description: descriptionObj,
        date: Date(Date.now())
      })
  }

  fetch(`http://localhost:4000/replies/${targetId}`, options)
  .then(response => response.json())
  .then(replyData => 
      this.setState({
        replies: [...this.state.replies, replyData]
    })
  )
}

replyDestroyHandler = (replyObj) => {

  let targetId = replyObj.id
  let options = { method: "DELETE" }
  let newArray = [...this.state.replies]
  let foundIndex = newArray.findIndex(element => element.id === targetId)
  let splicedArray = newArray.splice(foundIndex, 1) 
  
  fetch(`http://localhost:4000/replies/${targetId}`, options)
  .then(response => response.json())
  .then(replyData => console.log(replyData),
    this.setState({
      replies: newArray
    })
  )
}

  render() {
    console.log(this.state.targetPost)
    console.log(this.state.replies)
    
  return (
    <>
        <HeaderComp/>
    <div className="App">
       <Switch>
         <Route exact path="/" render={()=> 
          <Login/>}/>

         <Route exact path="/profile/:id" render={() => 
           <PostContainer
           comments={this.state.comments}
           posts={this.state.posts}
           replies={this.state.replies}
           user={this.state.current_user}
           commentUpdateHandler={this.commentUpdateHandler}
           commentDestroyHandler={this.commentDestroyHandler}
           targetPost={this.state.targetPost}
           targetComment={this.state.targetComment}
           targetCommentHandler={this.targetCommentHandler}
           replyUpdateHandler={this.replyUpdateHandler}
           replyDestroyHandler={this.replyDestroyHandler}
           />}/> 


         <Route exact path="/profile" render={() => 
           <Profile
           comments={this.state.comments}
           posts={this.state.posts}
           replies={this.state.replies}
           user={this.state.current_user}
           commentUpdateHandler={this.commentUpdateHandler}
           commentDestroyHandler={this.commentDestroyHandler}
           targetPost={this.state.targetPost}
           targetComment={this.state.targetComment}
           targetCommentHandler={this.targetCommentHandler}
           replyUpdateHandler={this.replyUpdateHandler}
           replyDestroyHandler={this.replyDestroyHandler}
           />}/> 

        <Route exact path="/home" render={() => 
          <HomePage 
          follows={this.state.follows}
          followPostHandler={this.followPostHandler}
          followDestroyHandler={this.followDestroyHandler}
          likePostHandler={this.likePostHandler}
          likeDestroyHandler={this.likeDestroyHandler}
          targetPostHandler={this.targetPostHandler}
          likes={this.state.likes} 
          posts={this.state.posts}
          targetPostHandler={this.targetPostHandler}
          user={this.state.current_user} 
          users={this.state.users} 
          />}/>
            

          <Route exact path="/nav" render={() => 
            <Nav
            follows={this.state.follows}
            followDestroyHandler={this.followDestroyHandler}
            followPostHandler={this.followPostHandler}
            likes={this.state.likes} 
            likeDestroyHandler={this.likeDestroyHandler}
            likePostHandler={this.likePostHandler}
            posts={this.state.posts}
            targetPostHandler={this.targetPostHandler}
            user={this.state.current_user}
            />}/>
          
          <Route exact path="/comment/:id/reply" render={()=> 
            <ReplyForm targetComment={this.state.targetComment}
                        replyPostHandler={this.replyPostHandler}
                        user={this.state.current_user}
            />}/>
          <Route exact path="post/:id/comment" render={()=>  
            <CommentForm 
              targetPost={this.state.targetPost}
              current_user={this.state.current_user}
               />}/>
          
          <Route exact path="/settings" render={() => 
            <Settings 
            current_user={this.state.current_user}/>}/>
          
          <Route exact path="/postform" render={()=> 
            <PostForm 
            current_user={this.state.current_user}/>}/>
          
          <Route exact path="/patchform" render={()=> 
            <PatchForm 
            current_user={this.state.current_user} 
            patchId={this.state.postPatch}/>}/>

          {/* <Route exact path="/dm" render={}/> */}
    
      </Switch>        
    </div>
    </>
    );
  }
}

export default App;
