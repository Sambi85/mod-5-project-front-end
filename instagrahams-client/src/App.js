import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import HeaderComp from './components/HeaderComp.js';
import HomePage from "./containers/Homepage.js"
import Profile from "./components/Profile.js";
import Nav from "./containers/Nav.js";
import Settings from "./containers/Settings.js";
import PostContainer from "./containers/PostContainer.js";
import PostForm from "./components/forms/PostForm.js";
import PatchForm from "./components/forms/PatchForm.js";
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
  
  /// COMPONENT DID MOUNT/LOGIN/RESET ------------------------------------------------- ///
  
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
        } 

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

  loginFetch = (loginObj) => {

    let options = {
       method: 'POST',
       headers: {
           "Content-Type": "application/json",
           "Accepts":"application/json"
       },
       body: JSON.stringify({
            username: loginObj.username,
            password: loginObj.password
       }) 
    }
    fetch('http://localhost:4000/login', options)
    .then(response => response.json())
    .then(loginData => {
      localStorage.setItem("current_token", loginData.jwt)
      this.setState({
        current_user: loginData.user
      }, () => {this.props.history.push("/home")})
      })      
}

  resetHandler = () => {
    localStorage.removeItem('current_token')
    this.setState({
      current_user: null
    })
  }

  /// User for PROFILE HANDLER ------------------------------------------------- ///

  profilePatchHandler = (patchObj) => {
    this.setState({
      postPatch: patchObj
    })
  }

  /// Likes for POST/DESTROY ------------------------------------------------- ///

  likePostHandler = (postObj) => {
    console.log("PostObj:",postObj)
    console.log("current user id:",this.state.current_user.id)
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
          likes: [likeObj,...this.state.likes]
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

/// Follows for POST/DESTROY ------------------------------------------------- ///

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

/// Posts for POST/PATCH/DESTROY/TARGETPOST ------------------------------------------------- ///

targetPostHandler = (postObj) => {
  this.setState({
    targetPost: postObj
  })
}
/// Comments for POST/ UPDATE/ DESTROY/TARGETCOMMENT ------------------------------------------------- ///
commentStatePostHandler = (commentObj) => {
  this.setState({
    comments: [commentObj, ...this.state.comments]
  })
}

commentUpdateHandler = (descriptionObj, commentObj) => {
  console.log("desciption:",descriptionObj)
  console.log("commentObj:",commentObj.id)
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
  .then(commentData => {
      
      let newArray = [...this.state.comments]
      newArray.splice(newArray.indexOf(commentObj), 1, commentData)
      this.setState({
          comments: newArray
      })
  })
}
//! commentUpdateHandler... State breaks down on Post Container level


commentStateDestroyHandler = (commentObj) => {

  let targetId = commentObj.id
  let options = { method: "DELETE" }
  let newArray = [...this.state.comments]
  let foundIndex = newArray.findIndex(element => element.id === targetId)
  let splicedArray = newArray.splice(foundIndex, 1) 
  
    this.setState({
      follows: newArray
    })
}

targetCommentHandler = (commentObj) => {
  this.setState({
    targetComment: commentObj
  })
}

/// Replies for POST/PATCH/DESTROY ------------------------------------------------- ///

replyPostHandler = (replyObj) => {
  this.setState({
  comments: [replyObj,...this.state.comments]
  })
  //? fetch lives in component/forms/ReplyForm !!!
}

replyStateUpdateHandler = (replyArray) => {

  this.setState({
    replies: replyArray
  })
}

replyStateDestroyHandler = (newArray) => {
  
  this.setState({
    replies: newArray
  })
}  

// replyDestroyHandler = (replyObj) => {

//   let targetId = replyObj.id
//   let options = { method: "DELETE" }
//   let newArray = [...this.state.replies]
//   let foundIndex = newArray.findIndex(element => element.id === targetId)
//   let splicedArray = newArray.splice(foundIndex, 1) 
  
//   fetch(`http://localhost:4000/replies/${targetId}`, options)
//   .then(response => response.json())
//   .then(replyData => console.log(replyData),
//     this.setState({
//       replies: newArray
//     })
//   )
// }

  render() {
    console.log("APP.JS:",this.state.comments)
    return (
      <>
        <HeaderComp resetHandler={this.resetHandler}/>
      <div className="App">
       <Switch>
         <Route exact path="/" render={()=> 
          <Login loginFetch={this.loginFetch}/>}/>

         <Route exact path="/profile/:id" render={() => 
           <PostContainer
           comments={this.state.comments}
           posts={this.state.posts}
           replies={this.state.replies}
           user={this.state.current_user}
           commentUpdateHandler={this.commentUpdateHandler}
           commentStateDestroyHandler={this.commentStateDestroyHandler}
           commentStatePostHandler={this.commentStatePostHandler}
           replyPostHandler={this.replyPostHandler}
           targetPost={this.state.targetPost}
           targetComment={this.state.targetComment}
           targetCommentHandler={this.targetCommentHandler}
           replyStateUpdateHandler={this.replyStateUpdateHandler}
           replyStateDestroyHandler={this.replyStateDestroyHandler}
           />}/> 

         <Route exact path="/profile" render={() => 
           <Profile
           comments={this.state.comments}
           likes={this.state.likes} 
           posts={this.state.posts}
           replies={this.state.replies}
           user={this.state.current_user}
           commentUpdateHandler={this.commentUpdateHandler}
           commentDestroyHandler={this.commentDestroyHandler}
           likePostHandler={this.likePostHandler}
           likeDestroyHandler={this.likeDestroyHandler}
           targetPost={this.state.targetPost}
           targetComment={this.state.targetComment}
           targetCommentHandler={this.targetCommentHandler}
           replyUpdateHandler={this.replyUpdateHandler}
           replyDestroyHandler={this.replyDestroyHandler}
           patchHandler={this.targetPostHandler}
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
    
      </Switch>        
    </div>
    </>
    );
  }
}

export default withRouter(App);
